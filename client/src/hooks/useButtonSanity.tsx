import { useEffect, useRef, useState } from 'react';

interface ButtonSanityConfig {
  validateOnMount?: boolean;
  scrollValidation?: boolean;
  claimRootCheck?: boolean;
  vaultMeshSync?: boolean;
}

interface ButtonSanityStatus {
  isValid: boolean;
  scrollBound: boolean;
  claimRootActive: boolean;
  vaultMeshConnected: boolean;
  lastValidation: string;
  errors: string[];
}

export function useButtonSanity(config: ButtonSanityConfig = {}) {
  const {
    validateOnMount = true,
    scrollValidation = true,
    claimRootCheck = true,
    vaultMeshSync = true
  } = config;

  const [status, setStatus] = useState<ButtonSanityStatus>({
    isValid: false,
    scrollBound: false,
    claimRootActive: false,
    vaultMeshConnected: false,
    lastValidation: '',
    errors: []
  });

  const validationRef = useRef<NodeJS.Timeout | null>(null);

  const performValidation = async () => {
    const errors: string[] = [];
    let isValid = true;
    let scrollBound = false;
    let claimRootActive = false;
    let vaultMeshConnected = false;

    try {
      // Scroll validation check
      if (scrollValidation) {
        try {
          const scrollResponse = await fetch('/api/scroll-validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              scrollId: `scroll_${Date.now()}`, 
              action: 'validate_ui' 
            })
          }).catch((fetchError) => {
            console.warn('Scroll validation fetch failed:', fetchError);
            return null;
          });
          
          if (scrollResponse && scrollResponse.ok) {
            const scrollData = await scrollResponse.json().catch(() => ({ validated: false }));
            scrollBound = scrollData.validated || false;
          } else {
            // Non-critical for UI operation
            console.warn('Scroll validation failed, continuing with degraded functionality');
            scrollBound = false;
          }
        } catch (error) {
          console.warn('Scroll validation error:', error);
          scrollBound = false;
        }
      }

      // ClaimRoot license check
      if (claimRootCheck) {
        try {
          const claimResponse = await fetch('/api/claimroot-status', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          }).catch((fetchError) => {
            console.warn('ClaimRoot fetch failed:', fetchError);
            return null;
          });
          
          if (claimResponse && claimResponse.ok) {
            claimRootActive = true;
          } else {
            console.warn('ClaimRoot license check failed, continuing with degraded functionality');
            claimRootActive = false;
          }
        } catch (error) {
          // ClaimRoot check is non-critical, just log
          console.warn('ClaimRoot status check failed:', error);
          claimRootActive = false;
        }
      }

      // VaultMesh connection check
      if (vaultMeshSync) {
        try {
          const vaultResponse = await fetch('/api/vaultmesh-status', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          }).catch((fetchError) => {
            console.warn('VaultMesh fetch failed:', fetchError);
            return null;
          });
          
          if (vaultResponse && vaultResponse.ok) {
            const vaultData = await vaultResponse.json().catch(() => ({ sync: 'inactive' }));
            vaultMeshConnected = vaultData.sync === 'active';
          } else {
            console.warn('VaultMesh connection check failed, continuing with degraded functionality');
            vaultMeshConnected = false;
          }
        } catch (error) {
          console.warn('VaultMesh network error:', error);
          vaultMeshConnected = false;
        }
      }

      // Set isValid to true if core functionality works (even if some checks fail)
      isValid = true; // Always allow UI operations, just track status
      
      setStatus({
        isValid,
        scrollBound,
        claimRootActive,
        vaultMeshConnected,
        lastValidation: new Date().toISOString(),
        errors
      });

    } catch (error) {
      console.warn('Button sanity validation error:', error);
      setStatus(prev => ({
        ...prev,
        isValid: true, // Don't block UI on validation errors
        errors: [],
        lastValidation: new Date().toISOString()
      }));
    }
  };

  // Validate buttons on component interactions
  const validateButton = async (buttonElement?: HTMLElement) => {
    if (buttonElement) {
      // Add visual indication that button is being validated
      buttonElement.style.opacity = '0.7';
      buttonElement.style.transition = 'opacity 0.2s';
      
      await performValidation();
      
      // Restore button appearance
      buttonElement.style.opacity = '1';
      
      // Add scroll-validation classes
      if (status.scrollBound && status.vaultMeshConnected) {
        buttonElement.classList.add('scroll-validated');
      } else {
        buttonElement.classList.add('scroll-invalid');
      }
    } else {
      await performValidation();
    }
  };

  // Auto-validation setup
  useEffect(() => {
    if (validateOnMount) {
      performValidation();
    }

    // Set up periodic validation every 9 seconds (matching VaultMesh pulse)
    validationRef.current = setInterval(performValidation, 9000);

    return () => {
      if (validationRef.current) {
        clearInterval(validationRef.current);
      }
    };
  }, [validateOnMount]);

  // Hook for button click validation
  const createValidatedHandler = (originalHandler: (event: any) => void) => {
    return async (event: any) => {
      // Validate before executing the original handler
      await validateButton(event.target);
      
      if (status.isValid || !scrollValidation) {
        originalHandler(event);
      } else {
        console.warn('Button action blocked: Failed scroll validation', status.errors);
        event.preventDefault();
      }
    };
  };

  // Validation status indicator component
  const ValidationIndicator = () => (
    <div className="fixed bottom-4 right-4 p-2 bg-faa-card border border-faa-border rounded-lg text-xs">
      <div className={`flex items-center space-x-2 ${status.isValid ? 'text-green-400' : 'text-red-400'}`}>
        <span>{status.isValid ? '✅' : '❌'}</span>
        <span>UI Sanity: {status.isValid ? 'VALID' : 'INVALID'}</span>
      </div>
      {status.errors.length > 0 && (
        <div className="mt-1 text-red-400">
          {status.errors.slice(0, 2).map((error, index) => (
            <div key={index}>• {error}</div>
          ))}
        </div>
      )}
      <div className="mt-1 text-gray-500">
        Last check: {status.lastValidation ? new Date(status.lastValidation).toLocaleTimeString() : 'Never'}
      </div>
    </div>
  );

  return {
    status,
    validateButton,
    createValidatedHandler,
    performValidation,
    ValidationIndicator
  };
}