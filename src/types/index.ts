export type UserRole = 'citizen' | 'lawyer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
  createdAt: Date;
  // Lawyer specific fields
  barCouncilId?: string;
  practiceAreas?: string[];
  experience?: number;
  rating?: number;
  // Admin specific fields
  permissions?: string[];
}

export interface Case {
  id: string;
  title: string;
  description: string;
  category: 'rent' | 'employment' | 'criminal' | 'civil' | 'family' | 'consumer' | 'other';
  status: 'pending' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  citizenId: string;
  lawyerId?: string;
  documents: Document[];
  messages: Message[];
  hearingDates: HearingDate[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  content: string;
  timestamp: Date;
  attachments?: Document[];
}

export interface HearingDate {
  id: string;
  date: Date;
  court: string;
  purpose: string;
  status: 'scheduled' | 'completed' | 'postponed' | 'cancelled';
  notes?: string;
}

export interface LawyerApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  barCouncilId: string;
  practiceAreas: string[];
  experience: number;
  documents: Document[];
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  rejectionReason?: string;
}