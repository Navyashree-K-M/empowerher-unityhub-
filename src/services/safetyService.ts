import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { EmergencyContact, SafetyResource, SosAlert } from '../types';

const EMERGENCY_CONTACTS_COLLECTION = 'emergency_contacts';
const SAFETY_RESOURCES_COLLECTION = 'safety_resources';
const SOS_ALERTS_COLLECTION = 'sos_alerts';

export const getEmergencyContacts = async (region?: string): Promise<EmergencyContact[]> => {
  try {
    const snapshot = await getDocs(collection(db, EMERGENCY_CONTACTS_COLLECTION));
    let contacts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as EmergencyContact[];
    
    if (region) {
      contacts = contacts.filter(contact => contact.region === region);
    }
    
    return contacts;
  } catch (error) {
    console.error('Error fetching emergency contacts:', error);
    throw error;
  }
};

export const getSafetyResources = async (): Promise<SafetyResource[]> => {
  try {
    const snapshot = await getDocs(collection(db, SAFETY_RESOURCES_COLLECTION));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as SafetyResource[];
  } catch (error) {
    console.error('Error fetching safety resources:', error);
    throw error;
  }
};

export const sendSosAlert = async (alert: SosAlert): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, SOS_ALERTS_COLLECTION), alert);
    return docRef.id;
  } catch (error) {
    console.error('Error sending SOS alert:', error);
    throw error;
  }
};

// Mock data for initial testing
export const MOCK_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: '1',
    name: 'Women\'s Helpline',
    phone: '1800-123-1234',
    region: 'National'
  },
  {
    id: '2',
    name: 'Police Emergency',
    phone: '100',
    region: 'National'
  },
  {
    id: '3',
    name: 'Ambulance',
    phone: '102',
    region: 'National'
  },
  {
    id: '4',
    name: 'Local Women\'s Support Center',
    phone: '1800-456-7890',
    region: 'Local'
  }
];

export const MOCK_SAFETY_RESOURCES: SafetyResource[] = [
  {
    id: '1',
    title: 'Safety Planning Tips',
    description: 'Learn how to create and maintain a personal safety plan in dangerous situations.',
    link: 'https://www.womenshealth.gov/relationships-and-safety/domestic-violence/safety-planning-victims-domestic-violence'
  },
  {
    id: '2',
    title: 'Legal Rights Overview',
    description: 'A comprehensive guide to your legal rights and protections as a woman in India.',
    link: 'https://wcd.nic.in/womendevelopment/legal-rights-women'
  },
  {
    id: '3',
    title: 'Digital Safety Guide',
    description: 'How to protect yourself online and maintain privacy in the digital world.',
    link: 'https://www.internetsafety101.org/safety-guides'
  },
  {
    id: '4',
    title: 'Emergency Preparedness',
    description: 'Steps to take during various emergency situations to stay safe.',
    link: 'https://www.ready.gov/safety-skills'
  }
];