import { collection, getDocs, getDoc, addDoc, doc, query, where, orderBy, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Product } from '../types';

const PRODUCTS_COLLECTION = 'products';

export const getProducts = async (filters?: { 
  category?: string; 
  minPrice?: number; 
  maxPrice?: number;
}): Promise<Product[]> => {
  try {
    const productsCollection = collection(db, PRODUCTS_COLLECTION);
    let productsQueryRef: any = productsCollection;
    
    // Apply filters if provided
    if (filters) {
      productsQueryRef = query(
        productsCollection,
        ...[
          filters.category ? where('category', '==', filters.category) : null,
          filters.minPrice !== undefined ? where('price', '>=', filters.minPrice) : null,
          filters.maxPrice !== undefined ? where('price', '<=', filters.maxPrice) : null,
          orderBy('created_at', 'desc')
        ].filter(Boolean) as any[]
      );
    }
    
    const snapshot = await getDocs(productsQueryRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() || {}
    })) as Product[];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const productDoc = await getDoc(doc(db, PRODUCTS_COLLECTION, id));
    
    if (!productDoc.exists()) {
      return null;
    }
    
    return {
      id: productDoc.id,
      ...productDoc.data()
    } as Product;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

export const addProduct = async (productData: Omit<Product, 'id' | 'created_at'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...productData,
      created_at: new Date().toISOString()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const updateProduct = async (id: string, productData: Partial<Omit<Product, 'id' | 'created_at'>>): Promise<void> => {
  try {
    await updateDoc(doc(db, PRODUCTS_COLLECTION, id), productData);
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};