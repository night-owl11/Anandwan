// API Configuration and Utilities
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://anandwan.onrender.com/api";

// Get token from localStorage
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Set token in localStorage
export const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

// Remove token from localStorage
export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Get user from localStorage
export const getUser = (): any => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

// Set user in localStorage
export const setUser = (user: any): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

// API request wrapper
const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = getToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include', // Include cookies
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error: any) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }) => {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (data.success && data.token) {
      setToken(data.token);
      setUser(data.user);
    }
    
    return data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (data.success && data.token) {
      setToken(data.token);
      setUser(data.user);
    }
    
    return data;
  },

  logout: async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } finally {
      removeToken();
    }
  },
};

// Donation API
export const donationAPI = {
  create: async (donationData: {
    amount: number;
    paymentMethod: string;
    donorName: string;
    donorEmail: string;
  }) => {
    return await apiRequest('/donations', {
      method: 'POST',
      body: JSON.stringify(donationData),
    });
  },

  getMyDonations: async (page: number = 1, limit: number = 10) => {
    return await apiRequest(`/donations/my?page=${page}&limit=${limit}`);
  },

  getAllDonations: async (params: {
    page?: number;
    limit?: number;
    status?: string;
    paymentMethod?: string;
    search?: string;
    sortBy?: string;
    startDate?: string;
    endDate?: string;
  } = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value.toString());
    });
    
    return await apiRequest(`/donations/all?${queryParams.toString()}`);
  },

  getById: async (id: string) => {
    return await apiRequest(`/donations/${id}`);
  },
};

// User API
export const userAPI = {
  getProfile: async () => {
    return await apiRequest('/users/profile');
  },

  updateProfile: async (userData: { name?: string; email?: string }) => {
    return await apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// Check if user has specific role
export const hasRole = (role: string): boolean => {
  const user = getUser();
  return user?.role === role;
};
