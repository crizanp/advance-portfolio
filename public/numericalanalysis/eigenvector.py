import numpy as np

# -----------------------------------------------
# POWER METHOD  -  Finds the LARGEST Eigenvalue
# -----------------------------------------------
def power_method(A, tol=1e-6, max_iter=1000):
    n = A.shape[0]
    x = np.ones(n)
    for i in range(max_iter):
        x_new = A @ x
        eigenvalue = np.max(np.abs(x_new))
        x_new = x_new / eigenvalue
        if np.linalg.norm(x_new - x) < tol:
            return eigenvalue, x_new
        x = x_new
    return eigenvalue, x


# -----------------------------------------------
# INVERSE POWER METHOD  -  Finds the SMALLEST Eigenvalue
# -----------------------------------------------
def inverse_power_method(A, tol=1e-6, max_iter=1000):
    n = A.shape[0]
    x = np.ones(n)
    A_inv = np.linalg.inv(A)
    for i in range(max_iter):
        x_new = A_inv @ x
        m = np.max(np.abs(x_new))
        x_new = x_new / m
        if np.linalg.norm(x_new - x) < tol:
            return 1.0 / m, x_new
        x = x_new
    return 1.0 / m, x


# -----------------------------------------------
# SHIFTED INVERSE POWER METHOD  -  Finds INTERMEDIATE Eigenvalue
# Choose shift value close to (but not equal to) the target eigenvalue
# -----------------------------------------------
def shifted_inverse_power_method(A, shift, tol=1e-6, max_iter=1000):
    n = A.shape[0]
    I = np.eye(n)
    x = np.ones(n)
    A_shifted_inv = np.linalg.inv(A - shift * I)
    for i in range(max_iter):
        x_new = A_shifted_inv @ x
        m = np.max(np.abs(x_new))
        x_new = x_new / m
        if np.linalg.norm(x_new - x) < tol:
            return shift + 1.0 / m, x_new
        x = x_new
    return shift + 1.0 / m, x


# -----------------------------------------------
# MAIN
# -----------------------------------------------
if __name__ == "__main__":

    A = np.array([
        [4, 1, 0],
        [1, 3, 1],
        [0, 1, 2]
    ], dtype=float)

    print("Matrix A:")
    print(A)
    print()

    lam_max, vec_max = power_method(A)
    print(f"Largest  Eigenvalue : {lam_max:.6f}")
    print(f"Eigenvector         : {vec_max}")
    print()

    lam_min, vec_min = inverse_power_method(A)
    print(f"Smallest Eigenvalue : {lam_min:.6f}")
    print(f"Eigenvector         : {vec_min}")
    print()

    shift_value = 2.5   # Choose a value close to but not equal to an eigenvalue
    lam_mid, vec_mid = shifted_inverse_power_method(A, shift=shift_value)
    print(f"Intermediate Eigenvalue (shift={shift_value}): {lam_mid:.6f}")
    print(f"Eigenvector                                 : {vec_mid}")
    print()

    # Verification
    vals, _ = np.linalg.eig(A)
    print("NumPy Verification (all eigenvalues sorted):")
    print(np.sort(vals))
