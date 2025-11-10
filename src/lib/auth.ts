// WARNING: This is a DEMO implementation for educational purposes only.
// DO NOT use this in production. Use a proper backend service like Supabase instead.

export interface User {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
}

// Hash password using Web Crypto API
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Get all users from localStorage
function getUsers(): User[] {
  const usersJson = localStorage.getItem('pathfinder_users');
  if (!usersJson) return [];
  try {
    return JSON.parse(usersJson);
  } catch {
    return [];
  }
}

// Save users to localStorage
function saveUsers(users: User[]): void {
  localStorage.setItem('pathfinder_users', JSON.stringify(users));
}

// Sign up a new user
export async function signUp(
  fullName: string,
  email: string,
  password: string
): Promise<{ success: boolean; message: string; user?: User }> {
  // Validate inputs
  if (!fullName || !email || !password) {
    return { success: false, message: 'All fields are required' };
  }

  if (password.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters' };
  }

  const users = getUsers();

  // Check if user already exists
  if (users.some(u => u.email === email)) {
    return { success: false, message: 'Email already registered' };
  }

  // Create new user
  const passwordHash = await hashPassword(password);
  const newUser: User = {
    id: crypto.randomUUID(),
    fullName,
    email,
    passwordHash,
  };

  users.push(newUser);
  saveUsers(users);

  return { success: true, message: 'Account created successfully', user: newUser };
}

// Log in a user
export async function login(
  email: string,
  password: string
): Promise<{ success: boolean; message: string; user?: User }> {
  // Validate inputs
  if (!email || !password) {
    return { success: false, message: 'Email and password are required' };
  }

  const users = getUsers();
  const passwordHash = await hashPassword(password);

  // Find user with matching email and password
  const user = users.find(u => u.email === email && u.passwordHash === passwordHash);

  if (!user) {
    return { success: false, message: 'Invalid email or password' };
  }

  // Store current user session
  localStorage.setItem('pathfinder_current_user', JSON.stringify({
    id: user.id,
    fullName: user.fullName,
    email: user.email,
  }));

  return { success: true, message: 'Login successful', user };
}

// Get current logged-in user
export function getCurrentUser(): { id: string; fullName: string; email: string } | null {
  const userJson = localStorage.getItem('pathfinder_current_user');
  if (!userJson) return null;
  try {
    return JSON.parse(userJson);
  } catch {
    return null;
  }
}

// Log out current user
export function logout(): void {
  localStorage.removeItem('pathfinder_current_user');
}

// Check if user is logged in
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}
