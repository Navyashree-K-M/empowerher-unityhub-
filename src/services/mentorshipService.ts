import { collection, getDocs, getDoc, addDoc, doc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Mentor, MentorshipRequest } from '../types';

const MENTORS_COLLECTION = 'mentors';
const MENTORSHIP_REQUESTS_COLLECTION = 'mentorship_requests';

export const getMentors = async (filters?: { 
  expertise?: string; 
  location?: string;
}): Promise<Mentor[]> => {
  try {
    const mentorsCollectionRef = collection(db, MENTORS_COLLECTION);
    let mentorsQueryRef: ReturnType<typeof query> = mentorsCollectionRef;
    
    // Apply filters if provided
    if (filters) {
      mentorsQueryRef = query(
        mentorsCollectionRef,
        ...[
          filters.expertise ? where('expertise', '==', filters.expertise) : null,
          filters.location ? where('location', '==', filters.location) : null
        ].filter(Boolean) as any[]
      );
    }
    
    const snapshot = await getDocs(mentorsQueryRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as object
    })) as Mentor[];
  } catch (error) {
    console.error('Error fetching mentors:', error);
    throw error;
  }
};

export const getMentorById = async (id: string): Promise<Mentor | null> => {
  try {
    const mentorDoc = await getDoc(doc(db, MENTORS_COLLECTION, id));
    
    if (!mentorDoc.exists()) {
      return null;
    }
    
    return {
      id: mentorDoc.id,
      ...mentorDoc.data()
    } as Mentor;
  } catch (error) {
    console.error(`Error fetching mentor with ID ${id}:`, error);
    throw error;
  }
};

export const requestMentorship = async (userId: string, mentorId: string): Promise<string> => {
  try {
    // Check if request already exists
    const existingRequests = query(
      collection(db, MENTORSHIP_REQUESTS_COLLECTION),
      where('user_id', '==', userId),
      where('mentor_id', '==', mentorId)
    );
    
    const snapshot = await getDocs(existingRequests);
    
    if (!snapshot.empty) {
      throw new Error('You have already requested mentorship from this mentor.');
    }
    
    const docRef = await addDoc(collection(db, MENTORSHIP_REQUESTS_COLLECTION), {
      user_id: userId,
      mentor_id: mentorId,
      status: 'pending',
      created_at: new Date().toISOString()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error requesting mentorship:', error);
    throw error;
  }
};

export const getUserMentorshipRequests = async (userId: string): Promise<MentorshipRequest[]> => {
  try {
    const requestsQuery = query(
      collection(db, MENTORSHIP_REQUESTS_COLLECTION),
      where('user_id', '==', userId),
      orderBy('created_at', 'desc')
    );
    
    const snapshot = await getDocs(requestsQuery);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as MentorshipRequest[];
  } catch (error) {
    console.error(`Error fetching mentorship requests for user ${userId}:`, error);
    throw error;
  }
};