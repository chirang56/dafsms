import { supabase } from '../supabaseClient';

export const fetchProducts = async () => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw error;
  return data;
};

export const addProduct = async (product) => {
  const { data, error } = await supabase.from('products').insert([product]);
  if (error) throw error;
  return data;
};

export const fetchCustomers = async () => {
  const { data, error } = await supabase.from('customers').select('*');
  if (error) throw error;
  return data;
};

export const addCustomer = async (customer) => {
  const { data, error } = await supabase.from('customers').insert([customer]);
  if (error) throw error;
  return data;
};
