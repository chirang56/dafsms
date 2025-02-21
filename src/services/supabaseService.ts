import { supabase } from '../supabaseClient';

// Fetch all products
export const fetchProducts = async () => {
  try {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Product Interface
interface Product {
  id?: number;
  name: string;
  price: number;
}

// Add a new product
export const addProduct = async (product: Product) => {
  try {
    const { data, error } = await supabase.from('products').insert([product]).select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding product:', error);
    return null;
  }
};

// Fetch all customers
export const fetchCustomers = async () => {
  try {
    const { data, error } = await supabase.from('customers').select('*');
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching customers:', error);
    return [];
  }
};

export const createCustomersTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      location TEXT,
      status TEXT DEFAULT 'Active',
      created_at TIMESTAMP DEFAULT now()
    );
  `;

  const { error } = await supabase.rpc('execute_sql', { query: createTableQuery });

  if (error) {
    console.error('Error creating customers table:', error);
  } else {
    console.log('Customers table created successfully or already exists.');
  }
};

// Customer Interface
interface Customer {
  id?: string; // Assuming UUID
  name: string;
  email: string;
}

// Add a new customer
export const addCustomer = async (customer: Customer) => {
  try {
    const { data, error } = await supabase.from('customers').insert([customer]).select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding customer:', error);
    return null;
  }
};

// Delete a customer
export const deleteCustomer = async (id: string) => {
  try {
    const { error } = await supabase.from('customers').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting customer:', error);
    return false;
  }
};
