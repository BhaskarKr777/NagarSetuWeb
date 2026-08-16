import { Issue, FieldStaffMember, DepartmentName } from '../types.js';

export const INITIAL_STAFF_MEMBERS: FieldStaffMember[] = [
  {
    id: 'staff-1',
    name: 'Ramesh Kumar',
    phone: '+91 98765 43210',
    department: 'Roads & Infrastructure',
    role: 'Senior Road Maintenance Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    activeTasks: 3,
  },
  {
    id: 'staff-2',
    name: 'Sunita Patil',
    phone: '+91 98765 43211',
    department: 'Sanitation',
    role: 'Ward Sanitation Inspector',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    activeTasks: 2,
  },
  {
    id: 'staff-3',
    name: 'Rajesh Verma',
    phone: '+91 98765 43212',
    department: 'Water Supply',
    role: 'Assistant Water Works Engineer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    activeTasks: 4,
  },
  {
    id: 'staff-4',
    name: 'Imran Sheikh',
    phone: '+91 98765 43213',
    department: 'Electrical',
    role: 'Streetlight Maintenance Officer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    activeTasks: 1,
  },
  {
    id: 'staff-5',
    name: 'Priya Nair',
    phone: '+91 98765 43214',
    department: 'Drainage',
    role: 'Stormwater Drainage In-Charge',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    activeTasks: 2,
  },
  {
    id: 'staff-6',
    name: 'Vikram Joshi',
    phone: '+91 98765 43215',
    department: 'Public Works',
    role: 'Civic Infrastructure Supervisor',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    activeTasks: 2,
  }
];

export const INITIAL_DEPARTMENTS: { name: DepartmentName; head: string; email: string; phone: string; icon: string }[] = [
  { name: 'Roads & Infrastructure', head: 'Er. A. K. Sharma', email: 'roads@muni.gov.in', phone: '080-2223401', icon: 'Construction' },
  { name: 'Sanitation', head: 'Dr. Meera Swaminathan', email: 'swachh@muni.gov.in', phone: '080-2223402', icon: 'Trash2' },
  { name: 'Water Supply', head: 'Er. V. Subramaniam', email: 'waterworks@muni.gov.in', phone: '080-2223403', icon: 'Droplets' },
  { name: 'Electrical', head: 'S. K. Ganguly', email: 'electrical@muni.gov.in', phone: '080-2223404', icon: 'Lightbulb' },
  { name: 'Drainage', head: 'R. K. Srivastava', email: 'drainage@muni.gov.in', phone: '080-2223405', icon: 'Waves' },
  { name: 'Public Works', head: 'N. Chandrashekar', email: 'pwd@muni.gov.in', phone: '080-2223406', icon: 'Building2' },
];

export const INITIAL_ISSUES: Issue[] = [
  {
    id: 'NS-2026-00124',
    title: 'Deep Hazardous Pothole near Main Market Cross',
    description: 'A 2-foot wide and 6-inch deep crater has opened right at the busy turning near Metro Pillar 142. Two two-wheelers skidded last evening during rainfall.',
    category: 'Roads',
    priority: 'High',
    status: 'In Progress',
    location: {
      address: '100 Feet Road, Near Metro Pillar 142, Indiranagar',
      ward: 'Ward 14 - Indiranagar',
      city: 'Bengaluru',
      lat: 12.9784,
      lng: 77.6408,
      landmark: 'Opposite Costa Coffee'
    },
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80',
    department: 'Roads & Infrastructure',
    assignedStaff: INITIAL_STAFF_MEMBERS[0],
    citizenName: 'Aarav Sharma',
    citizenPhone: '+91 98450 11223',
    citizenEmail: 'aarav.sharma@gmail.com',
    citizenId: 'usr-citizen-01',
    createdAt: '2026-08-14T09:30:00Z',
    updatedAt: '2026-08-15T14:15:00Z',
    upvotes: 42,
    upvotedBy: ['usr-101', 'usr-102', 'usr-103'],
    slaDeadline: '2026-08-17T09:30:00Z',
    isSlaBreached: false,
    timeline: [
      { status: 'Reported', label: 'Report Submitted by Citizen', date: '14 Aug 2026, 09:30 AM', actor: 'Aarav Sharma' },
      { status: 'Under Review', label: 'Verified by Municipal Control Room', date: '14 Aug 2026, 11:00 AM', actor: 'Control Room Team' },
      { status: 'Assigned', label: 'Assigned to Roads & Infrastructure Dept', date: '14 Aug 2026, 02:30 PM', actor: 'Admin (Shreya Deshmukh)', notes: 'Assigned to Lead Ramesh Kumar' },
      { status: 'In Progress', label: 'Asphalt Patching Crew Dispatched', date: '15 Aug 2026, 02:15 PM', actor: 'Ramesh Kumar', notes: 'Bitumen and roller crew on site' }
    ],
    internalNotes: [
      { id: 'n-1', author: 'Shreya Deshmukh', role: 'Municipal Commissioner', text: 'High traffic corridor. Please prioritize before Monday rush hour.', createdAt: '14 Aug 2026, 02:35 PM' },
      { id: 'n-2', author: 'Ramesh Kumar', role: 'Field Staff', text: 'Material arrived on site. Compaction work underway.', createdAt: '15 Aug 2026, 02:20 PM' }
    ]
  },
  {
    id: 'NS-2026-00125',
    title: 'Overflowing Community Garbage Dumpster',
    description: 'Municipal bin has not been cleared for over 4 days. Waste spilling onto the pedestrian pathway and generating severe odor.',
    category: 'Garbage',
    priority: 'High',
    status: 'Reported',
    location: {
      address: '8th Main, 4th Block, Koramangala',
      ward: 'Ward 08 - Koramangala',
      city: 'Bengaluru',
      lat: 12.9352,
      lng: 77.6245,
      landmark: 'Behind BDA Complex'
    },
    imageUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80',
    citizenName: 'Meera Iyer',
    citizenPhone: '+91 98450 99887',
    citizenEmail: 'meera.iyer@outlook.com',
    citizenId: 'usr-citizen-02',
    createdAt: '2026-08-16T07:15:00Z',
    updatedAt: '2026-08-16T07:15:00Z',
    upvotes: 28,
    upvotedBy: ['usr-104', 'usr-105'],
    slaDeadline: '2026-08-17T07:15:00Z',
    isSlaBreached: false,
    timeline: [
      { status: 'Reported', label: 'Report Submitted by Citizen', date: '16 Aug 2026, 07:15 AM', actor: 'Meera Iyer' }
    ],
    internalNotes: []
  },
  {
    id: 'NS-2026-00126',
    title: 'High Pressure Drinking Water Pipeline Leakage',
    description: 'Main distribution valve burst on Station Road. Thousands of liters of clean drinking water gushing out and flooding road.',
    category: 'Water',
    priority: 'High',
    status: 'Assigned',
    location: {
      address: 'Station Road, Near Platform 1 Exit, Shivaji Nagar',
      ward: 'Ward 05 - Shivaji Nagar',
      city: 'Bengaluru',
      lat: 12.9856,
      lng: 77.6058,
      landmark: 'Opposite Railway Police Station'
    },
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&auto=format&fit=crop&q=80',
    department: 'Water Supply',
    assignedStaff: INITIAL_STAFF_MEMBERS[2],
    citizenName: 'Karthik Rao',
    citizenPhone: '+91 99000 44556',
    citizenEmail: 'karthik.rao@gmail.com',
    citizenId: 'usr-citizen-03',
    createdAt: '2026-08-15T11:20:00Z',
    updatedAt: '2026-08-15T16:45:00Z',
    upvotes: 67,
    upvotedBy: ['usr-101', 'usr-106', 'usr-107', 'usr-108'],
    slaDeadline: '2026-08-16T11:20:00Z',
    isSlaBreached: false,
    timeline: [
      { status: 'Reported', label: 'Report Submitted by Citizen', date: '15 Aug 2026, 11:20 AM', actor: 'Karthik Rao' },
      { status: 'Under Review', label: 'Urgent Alert Acknowledged', date: '15 Aug 2026, 11:45 AM', actor: 'Emergency Desk' },
      { status: 'Assigned', label: 'Assigned to Water Supply Rapid Response', date: '15 Aug 2026, 04:45 PM', actor: 'Admin Desk', notes: 'Assigned to Rajesh Verma' }
    ],
    internalNotes: [
      { id: 'n-3', author: 'Control Room', role: 'Operator', text: 'Main line feeder valve shutoff requested to BWSSB depot.', createdAt: '15 Aug 2026, 12:00 PM' }
    ]
  },
  {
    id: 'NS-2026-00127',
    title: 'Non-Functional LED Streetlights on Residential Stretch',
    description: 'Four consecutive streetlights out of order since Tuesday. Stretch is completely dark, causing safety concerns for women and elderly residents.',
    category: 'Streetlight',
    priority: 'Medium',
    status: 'Resolved',
    location: {
      address: '15th Cross, 2nd Stage, Malleshwaram',
      ward: 'Ward 03 - Malleshwaram',
      city: 'Bengaluru',
      lat: 13.0031,
      lng: 77.5701,
      landmark: 'Near Canara Bank Circle'
    },
    imageUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&auto=format&fit=crop&q=80',
    resolutionImageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80',
    resolutionNote: 'Replaced 4 blown 70W LED luminaires and repaired severed underground feeder cable.',
    resolvedAt: '2026-08-14T18:30:00Z',
    department: 'Electrical',
    assignedStaff: INITIAL_STAFF_MEMBERS[3],
    citizenName: 'Aarav Sharma',
    citizenPhone: '+91 98450 11223',
    citizenEmail: 'aarav.sharma@gmail.com',
    citizenId: 'usr-citizen-01',
    createdAt: '2026-08-12T19:00:00Z',
    updatedAt: '2026-08-14T18:30:00Z',
    upvotes: 19,
    upvotedBy: ['usr-109', 'usr-110'],
    slaDeadline: '2026-08-15T19:00:00Z',
    isSlaBreached: false,
    feedback: {
      rating: 5,
      comment: 'Very quick resolution by the electrical team! The street is well-lit now. Thank you NagarSetu team.',
      submittedAt: '2026-08-15T08:10:00Z'
    },
    timeline: [
      { status: 'Reported', label: 'Report Submitted by Citizen', date: '12 Aug 2026, 07:00 PM', actor: 'Aarav Sharma' },
      { status: 'Under Review', label: 'Under Review by Ward Officer', date: '13 Aug 2026, 09:30 AM', actor: 'Ward 03 Desk' },
      { status: 'Assigned', label: 'Assigned to Electrical Dept', date: '13 Aug 2026, 11:15 AM', actor: 'Admin', notes: 'Assigned to Imran Sheikh' },
      { status: 'In Progress', label: 'Maintenance Van on Site', date: '14 Aug 2026, 04:00 PM', actor: 'Imran Sheikh' },
      { status: 'Resolved', label: 'Issue Successfully Resolved', date: '14 Aug 2026, 06:30 PM', actor: 'Imran Sheikh', notes: 'Luminaires replaced and test verified' }
    ],
    internalNotes: []
  },
  {
    id: 'NS-2026-00128',
    title: 'Clogged Stormwater Drain Causing Waterlogging',
    description: 'Drain inlet completely choked with plastic silt and construction debris. Pre-monsoon water accumulation entering ground floor houses.',
    category: 'Drainage',
    priority: 'High',
    status: 'In Progress',
    location: {
      address: '24th Main, HSR Layout Sector 1',
      ward: 'Ward 12 - HSR Layout',
      city: 'Bengaluru',
      lat: 12.9121,
      lng: 77.6446,
      landmark: 'Near Agara Lake Road junction'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80',
    department: 'Drainage',
    assignedStaff: INITIAL_STAFF_MEMBERS[4],
    citizenName: 'Sneha Kulkarni',
    citizenPhone: '+91 97400 33445',
    citizenEmail: 'sneha.kulkarni@gmail.com',
    citizenId: 'usr-citizen-04',
    createdAt: '2026-08-15T08:00:00Z',
    updatedAt: '2026-08-16T10:00:00Z',
    upvotes: 35,
    upvotedBy: ['usr-101', 'usr-111', 'usr-112'],
    slaDeadline: '2026-08-16T18:00:00Z',
    isSlaBreached: false,
    timeline: [
      { status: 'Reported', label: 'Report Submitted', date: '15 Aug 2026, 08:00 AM', actor: 'Sneha Kulkarni' },
      { status: 'Under Review', label: 'Under Review', date: '15 Aug 2026, 10:30 AM', actor: 'Drainage Division' },
      { status: 'Assigned', label: 'Assigned to Stormwater Specialist', date: '15 Aug 2026, 01:00 PM', actor: 'Admin', notes: 'Assigned to Priya Nair' },
      { status: 'In Progress', label: 'Suction Machine & Desilting Deployed', date: '16 Aug 2026, 10:00 AM', actor: 'Priya Nair' }
    ],
    internalNotes: []
  }
];
