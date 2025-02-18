import { supabase } from '../supabaseClient';

export const fetchProducts = async () => {
  try {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error('Supabase error fetching products:', error);
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const addProduct = async (product) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select();

    if (error) {
      console.error('Supabase error adding product:', error);
      // Improved error logging
      console.error('Supabase error details:', error.details);
      console.error('Supabase error hint:', error.hint);
      throw error;
    }

    if (!data || data.length === 0) {
      console.warn('No data returned after inserting product.');
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
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
