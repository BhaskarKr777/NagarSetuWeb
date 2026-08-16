import { Issue, FieldStaffMember, DepartmentName, UserProfile } from '../types';

export const FIELD_STAFF_MEMBERS: FieldStaffMember[] = [
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

export const DEPARTMENTS: { name: DepartmentName; head: string; email: string; phone: string; icon: string }[] = [
  { name: 'Roads & Infrastructure', head: 'Er. A. K. Sharma', email: 'roads@muni.gov.in', phone: '080-2223401', icon: 'Construction' },
  { name: 'Sanitation', head: 'Dr. Meera Swaminathan', email: 'swachh@muni.gov.in', phone: '080-2223402', icon: 'Trash2' },
  { name: 'Water Supply', head: 'Er. V. Subramaniam', email: 'waterworks@muni.gov.in', phone: '080-2223403', icon: 'Droplets' },
  { name: 'Electrical', head: 'S. K. Ganguly', email: 'electrical@muni.gov.in', phone: '080-2223404', icon: 'Lightbulb' },
  { name: 'Drainage', head: 'R. K. Srivastava', email: 'drainage@muni.gov.in', phone: '080-2223405', icon: 'Waves' },
  { name: 'Public Works', head: 'N. Chandrashekar', email: 'pwd@muni.gov.in', phone: '080-2223406', icon: 'Building2' },
];

export const DEMO_USERS: Record<string, UserProfile> = {
  citizen: {
    id: 'usr-citizen-01',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@gmail.com',
    phone: '+91 98450 11223',
    role: 'citizen',
    ward: 'Ward 14 - Indiranagar',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    reportsCount: 6,
    resolvedCount: 4,
    civicPoints: 340,
  },
  admin: {
    id: 'usr-admin-01',
    name: 'Shreya Deshmukh, IAS',
    email: 'commissioner@municipalcorp.gov.in',
    phone: '+91 80222 99000',
    role: 'admin',
    ward: 'Municipal HQ - Central Zone',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
  },
  staff: {
    id: 'staff-1',
    name: 'Ramesh Kumar',
    email: 'ramesh.roads@municipalcorp.gov.in',
    phone: '+91 98765 43210',
    role: 'staff',
    ward: 'Zone 4 - East District',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  }
};

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
    assignedStaff: FIELD_STAFF_MEMBERS[0],
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
    assignedStaff: FIELD_STAFF_MEMBERS[2],
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
    assignedStaff: FIELD_STAFF_MEMBERS[3],
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
    assignedStaff: FIELD_STAFF_MEMBERS[4],
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
  },
  {
    id: 'NS-2026-00129',
    title: 'Broken Paver Blocks & Open Manhole on Footpath',
    description: 'Footpath paving has collapsed exposing open chamber underneath. Extremely dangerous for visually impaired individuals and joggers.',
    category: 'Infrastructure',
    priority: 'High',
    status: 'Under Review',
    location: {
      address: 'Brigade Road, Commercial Precinct',
      ward: 'Ward 18 - Central Business District',
      city: 'Bengaluru',
      lat: 12.9734,
      lng: 77.6074,
      landmark: 'Near Opera House Junction'
    },
    imageUrl: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?w=800&auto=format&fit=crop&q=80',
    citizenName: 'Rohan Gupta',
    citizenPhone: '+91 98110 55667',
    citizenEmail: 'rohan.gupta@techmail.com',
    citizenId: 'usr-citizen-05',
    createdAt: '2026-08-16T06:30:00Z',
    updatedAt: '2026-08-16T08:00:00Z',
    upvotes: 51,
    upvotedBy: ['usr-101', 'usr-113', 'usr-114', 'usr-115'],
    slaDeadline: '2026-08-17T06:30:00Z',
    isSlaBreached: false,
    timeline: [
      { status: 'Reported', label: 'Report Submitted', date: '16 Aug 2026, 06:30 AM', actor: 'Rohan Gupta' },
      { status: 'Under Review', label: 'Under Review & Safety Barricade Requested', date: '16 Aug 2026, 08:00 AM', actor: 'CBD Ward Inspector' }
    ],
    internalNotes: []
  },
  {
    id: 'NS-2026-00130',
    title: 'Fallen Tree Branch Obstructing Lane',
    description: 'Large banyan branch fell following thunderstorm. Blocking vehicular traffic and resting dangerously on power lines.',
    category: 'Other',
    priority: 'Medium',
    status: 'Resolved',
    location: {
      address: '7th Cross, 3rd Block, Jayanagar',
      ward: 'Ward 09 - Jayanagar',
      city: 'Bengaluru',
      lat: 12.9299,
      lng: 77.5826,
      landmark: 'Near Madhavan Park'
    },
    imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&auto=format&fit=crop&q=80',
    resolutionImageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80',
    resolutionNote: 'Forest wing hydraulic woodcutter deployed. Branch cut, cleared, and traffic lane restored.',
    resolvedAt: '2026-08-15T15:00:00Z',
    department: 'Public Works',
    assignedStaff: FIELD_STAFF_MEMBERS[5],
    citizenName: 'Aarav Sharma',
    citizenPhone: '+91 98450 11223',
    citizenEmail: 'aarav.sharma@gmail.com',
    citizenId: 'usr-citizen-01',
    createdAt: '2026-08-15T07:30:00Z',
    updatedAt: '2026-08-15T15:00:00Z',
    upvotes: 14,
    upvotedBy: ['usr-116', 'usr-117'],
    slaDeadline: '2026-08-16T07:30:00Z',
    isSlaBreached: false,
    feedback: {
      rating: 5,
      comment: 'Prompt action within hours on a weekend! Great job.',
      submittedAt: '2026-08-15T17:00:00Z'
    },
    timeline: [
      { status: 'Reported', label: 'Report Submitted', date: '15 Aug 2026, 07:30 AM', actor: 'Aarav Sharma' },
      { status: 'Assigned', label: 'Assigned to Public Works & Forest Cell', date: '15 Aug 2026, 09:00 AM', actor: 'Admin' },
      { status: 'In Progress', label: 'Tree Removal in Operation', date: '15 Aug 2026, 11:30 AM', actor: 'Vikram Joshi' },
      { status: 'Resolved', label: 'Cleared and Road Opened', date: '15 Aug 2026, 03:00 PM', actor: 'Vikram Joshi' }
    ],
    internalNotes: []
  },
  {
    id: 'NS-2026-00131',
    title: 'Untreated Sewage Overflowing on Service Road',
    description: 'Underground sewage line choked. Gray water overflowing onto public road for 3 consecutive days.',
    category: 'Drainage',
    priority: 'High',
    status: 'Reported',
    location: {
      address: 'Outer Ring Road Service Lane, Bellandur',
      ward: 'Ward 20 - Bellandur',
      city: 'Bengaluru',
      lat: 12.9304,
      lng: 77.6784,
      landmark: 'Near EcoSpace Tech Park'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80',
    citizenName: 'Vikram Mehta',
    citizenPhone: '+91 99887 66554',
    citizenEmail: 'vikram.m@gmail.com',
    citizenId: 'usr-citizen-06',
    createdAt: '2026-08-16T08:45:00Z',
    updatedAt: '2026-08-16T08:45:00Z',
    upvotes: 45,
    upvotedBy: ['usr-101', 'usr-118', 'usr-119'],
    slaDeadline: '2026-08-17T08:45:00Z',
    isSlaBreached: false,
    timeline: [
      { status: 'Reported', label: 'Report Submitted', date: '16 Aug 2026, 08:45 AM', actor: 'Vikram Mehta' }
    ],
    internalNotes: []
  },
  {
    id: 'NS-2026-00132',
    title: 'Cracked Road Surface Post Pipeline Excavation',
    description: 'Contractor excavated road for fiber cables 2 weeks ago and left uneven gravel fill without asphalt top coat.',
    category: 'Roads',
    priority: 'Medium',
    status: 'Assigned',
    location: {
      address: 'ITPL Main Road, Whitefield',
      ward: 'Ward 22 - Whitefield',
      city: 'Bengaluru',
      lat: 12.9698,
      lng: 77.7499,
      landmark: 'Opposite Inorbit Mall'
    },
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80',
    department: 'Roads & Infrastructure',
    assignedStaff: FIELD_STAFF_MEMBERS[0],
    citizenName: 'Pooja Hegde',
    citizenPhone: '+91 97312 88990',
    citizenEmail: 'pooja.h@yahoo.com',
    citizenId: 'usr-citizen-07',
    createdAt: '2026-08-13T14:20:00Z',
    updatedAt: '2026-08-14T10:00:00Z',
    upvotes: 23,
    upvotedBy: ['usr-120', 'usr-121'],
    slaDeadline: '2026-08-15T14:20:00Z',
    isSlaBreached: true,
    timeline: [
      { status: 'Reported', label: 'Report Submitted', date: '13 Aug 2026, 02:20 PM', actor: 'Pooja Hegde' },
      { status: 'Under Review', label: 'Under Review', date: '13 Aug 2026, 04:00 PM', actor: 'Zone 4 Desk' },
      { status: 'Assigned', label: 'Assigned to Roads Dept', date: '14 Aug 2026, 10:00 AM', actor: 'Admin' }
    ],
    internalNotes: [
      { id: 'n-4', author: 'Shreya Deshmukh', role: 'Admin', text: 'Notice issued to utility contractor for delayed restoration.', createdAt: '14 Aug 2026, 10:15 AM' }
    ]
  },
  {
    id: 'NS-2026-00133',
    title: 'Open Electric Junction Box with Exposed High Voltage Wires',
    description: 'Electric junction box lid missing on children playground boundary wall. Live wires exposed at waist height.',
    category: 'Streetlight',
    priority: 'High',
    status: 'In Progress',
    location: {
      address: 'Corporation Park, Ward 14, Indiranagar',
      ward: 'Ward 14 - Indiranagar',
      city: 'Bengaluru',
      lat: 12.9722,
      lng: 77.6391,
      landmark: 'Near Children Play Area'
    },
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    department: 'Electrical',
    assignedStaff: FIELD_STAFF_MEMBERS[3],
    citizenName: 'Aarav Sharma',
    citizenPhone: '+91 98450 11223',
    citizenEmail: 'aarav.sharma@gmail.com',
    citizenId: 'usr-citizen-01',
    createdAt: '2026-08-16T05:00:00Z',
    updatedAt: '2026-08-16T09:30:00Z',
    upvotes: 59,
    upvotedBy: ['usr-101', 'usr-122', 'usr-123'],
    slaDeadline: '2026-08-16T17:00:00Z',
    isSlaBreached: false,
    timeline: [
      { status: 'Reported', label: 'Report Submitted', date: '16 Aug 2026, 05:00 AM', actor: 'Aarav Sharma' },
      { status: 'Assigned', label: 'Priority Emergency Assignment', date: '16 Aug 2026, 06:00 AM', actor: 'Admin (Shreya Deshmukh)' },
      { status: 'In Progress', label: 'Electrician on Site for Enclosure Fitting', date: '16 Aug 2026, 09:30 AM', actor: 'Imran Sheikh' }
    ],
    internalNotes: [
      { id: 'n-5', author: 'Imran Sheikh', role: 'Field Staff', text: 'Power isolated temporarily. Fabricating steel safety lock box.', createdAt: '16 Aug 2026, 09:35 AM' }
    ]
  },
  {
    id: 'NS-2026-00134',
    title: 'Irregular Garbage Collection in Residential Lane',
    description: 'Door-to-door waste collection vehicle skipping 5th Cross lane for over a week.',
    category: 'Garbage',
    priority: 'Low',
    status: 'Resolved',
    location: {
      address: '5th Cross, Sadashivanagar',
      ward: 'Ward 02 - Sadashivanagar',
      city: 'Bengaluru',
      lat: 13.0068,
      lng: 77.5813,
      landmark: 'Near Sankey Tank Gate 2'
    },
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80',
    resolutionImageUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=80',
    resolutionNote: 'Route schedule reallocated. Auto tipper vehicle assigned daily 7:30 AM pickup.',
    resolvedAt: '2026-08-14T11:00:00Z',
    department: 'Sanitation',
    assignedStaff: FIELD_STAFF_MEMBERS[1],
    citizenName: 'Devika Sen',
    citizenPhone: '+91 98860 12345',
    citizenEmail: 'devika.sen@gmail.com',
    citizenId: 'usr-citizen-08',
    createdAt: '2026-08-11T10:00:00Z',
    updatedAt: '2026-08-14T11:00:00Z',
    upvotes: 11,
    upvotedBy: ['usr-124', 'usr-125'],
    slaDeadline: '2026-08-14T10:00:00Z',
    isSlaBreached: false,
    feedback: {
      rating: 4,
      comment: 'Regular collection has restarted properly. Thanks.',
      submittedAt: '2026-08-14T14:00:00Z'
    },
    timeline: [
      { status: 'Reported', label: 'Report Submitted', date: '11 Aug 2026, 10:00 AM', actor: 'Devika Sen' },
      { status: 'Assigned', label: 'Assigned to Sanitation Division', date: '12 Aug 2026, 09:00 AM', actor: 'Admin' },
      { status: 'Resolved', label: 'Route Optimized & Verified', date: '14 Aug 2026, 11:00 AM', actor: 'Sunita Patil' }
    ],
    internalNotes: []
  },
  {
    id: 'NS-2026-00135',
    title: 'Low Water Pressure in Municipal Supply Line',
    description: 'Drinking water supplied with very low pressure for the past 5 days. Not reaching overhead tanks.',
    category: 'Water',
    priority: 'Medium',
    status: 'Under Review',
    location: {
      address: '12th A Main, 6th Block, Rajajinagar',
      ward: 'Ward 07 - Rajajinagar',
      city: 'Bengaluru',
      lat: 12.9915,
      lng: 77.5558,
      landmark: 'Near ESI Hospital'
    },
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&auto=format&fit=crop&q=80',
    citizenName: 'Naveen Bhat',
    citizenPhone: '+91 94480 23456',
    citizenEmail: 'naveen.bhat@gmail.com',
    citizenId: 'usr-citizen-09',
    createdAt: '2026-08-16T09:00:00Z',
    updatedAt: '2026-08-16T09:00:00Z',
    upvotes: 18,
    upvotedBy: ['usr-126', 'usr-127'],
    slaDeadline: '2026-08-18T09:00:00Z',
    isSlaBreached: false,
    timeline: [
      { status: 'Reported', label: 'Report Submitted', date: '16 Aug 2026, 09:00 AM', actor: 'Naveen Bhat' }
    ],
    internalNotes: []
  },
  {
    id: 'NS-2026-00136',
    title: 'Damaged Public Bus Stop Shelter Glass & Bench',
    description: 'Vandalized glass panel and broken seating bench at busy public transport stop.',
    category: 'Infrastructure',
    priority: 'Low',
    status: 'Assigned',
    location: {
      address: 'Old Airport Road, Murugeshpalya',
      ward: 'Ward 15 - Domlur',
      city: 'Bengaluru',
      lat: 12.9567,
      lng: 77.6582,
      landmark: 'Opposite Total Mall Junction'
    },
    imageUrl: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?w=800&auto=format&fit=crop&q=80',
    department: 'Public Works',
    assignedStaff: FIELD_STAFF_MEMBERS[5],
    citizenName: 'Aarav Sharma',
    citizenPhone: '+91 98450 11223',
    citizenEmail: 'aarav.sharma@gmail.com',
    citizenId: 'usr-citizen-01',
    createdAt: '2026-08-14T16:00:00Z',
    updatedAt: '2026-08-15T09:00:00Z',
    upvotes: 9,
    upvotedBy: ['usr-101'],
    slaDeadline: '2026-08-19T16:00:00Z',
    isSlaBreached: false,
    timeline: [
      { status: 'Reported', label: 'Report Submitted', date: '14 Aug 2026, 04:00 PM', actor: 'Aarav Sharma' },
      { status: 'Assigned', label: 'Assigned to Public Works', date: '15 Aug 2026, 09:00 AM', actor: 'Admin' }
    ],
    internalNotes: []
  },
  {
    id: 'NS-2026-00137',
    title: 'Plastic Waste and Debris Clogging Secondary Canal',
    description: 'Heavy solid waste clogging the feeder storm drain causing mosquito breeding and stagnant foul water.',
    category: 'Drainage',
    priority: 'Medium',
    status: 'Resolved',
    location: {
      address: 'Bannerghatta Main Road, Bilekahalli',
      ward: 'Ward 25 - Bilekahalli',
      city: 'Bengaluru',
      lat: 12.8984,
      lng: 77.5992,
      landmark: 'Near IIM Bangalore Backgate'
    },
    imageUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80',
    resolutionImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80',
    resolutionNote: 'Desilting team cleared 2.5 tons of plastic silt using excavator. Water flow fully normalized.',
    resolvedAt: '2026-08-13T16:00:00Z',
    department: 'Drainage',
    assignedStaff: FIELD_STAFF_MEMBERS[4],
    citizenName: 'Sunil Nair',
    citizenPhone: '+91 98440 88776',
    citizenEmail: 'sunil.nair@live.com',
    citizenId: 'usr-citizen-10',
    createdAt: '2026-08-10T12:00:00Z',
    updatedAt: '2026-08-13T16:00:00Z',
    upvotes: 38,
    upvotedBy: ['usr-128', 'usr-129', 'usr-130'],
    slaDeadline: '2026-08-13T12:00:00Z',
    isSlaBreached: false,
    feedback: {
      rating: 5,
      comment: 'Excellent work by the drainage team. Stagnation issue completely solved before rains.',
      submittedAt: '2026-08-13T19:30:00Z'
    },
    timeline: [
      { status: 'Reported', label: 'Report Submitted', date: '10 Aug 2026, 12:00 PM', actor: 'Sunil Nair' },
      { status: 'Assigned', label: 'Assigned to Drainage Dept', date: '11 Aug 2026, 10:00 AM', actor: 'Admin' },
      { status: 'In Progress', label: 'Excavator & Desilting Work', date: '12 Aug 2026, 09:00 AM', actor: 'Priya Nair' },
      { status: 'Resolved', label: 'Cleared and Canal Restored', date: '13 Aug 2026, 04:00 PM', actor: 'Priya Nair' }
    ],
    internalNotes: []
  },
  {
    id: 'NS-2026-00138',
    title: 'Severe Road Collapse & Sinkhole Formation',
    description: 'Underground utility seepage has caused road sub-base collapse. A 4ft sinkhole has formed on the right lane.',
    category: 'Roads',
    priority: 'High',
    status: 'Reported',
    location: {
      address: 'Outer Ring Road, Marathahalli Bridge Approach',
      ward: 'Ward 21 - Marathahalli',
      city: 'Bengaluru',
      lat: 12.9554,
      lng: 77.7011,
      landmark: 'Near Multiplex Junction'
    },
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80',
    citizenName: 'Manish Pandey',
    citizenPhone: '+91 99011 22334',
    citizenEmail: 'manish.p@gmail.com',
    citizenId: 'usr-citizen-11',
    createdAt: '2026-08-16T10:15:00Z',
    updatedAt: '2026-08-16T10:15:00Z',
    upvotes: 74,
    upvotedBy: ['usr-101', 'usr-131', 'usr-132', 'usr-133'],
    slaDeadline: '2026-08-17T10:15:00Z',
    isSlaBreached: false,
    timeline: [
      { status: 'Reported', label: 'Report Submitted', date: '16 Aug 2026, 10:15 AM', actor: 'Manish Pandey' }
    ],
    internalNotes: []
  }
];

export const MOCK_SAMPLE_PHOTOS = [
  { label: 'Pothole on Road', url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80' },
  { label: 'Overflowing Garbage', url: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80' },
  { label: 'Water Pipe Burst', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&auto=format&fit=crop&q=80' },
  { label: 'Broken Streetlight', url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&auto=format&fit=crop&q=80' },
  { label: 'Clogged Drain', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80' },
  { label: 'Damaged Pavement', url: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?w=800&auto=format&fit=crop&q=80' },
];

export const MOCK_RESOLUTION_PHOTOS = [
  { label: 'Pothole Repaired & Sealed', url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80' },
  { label: 'Bin Cleared & Sanitized', url: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=80' },
  { label: 'Pipeline Welded & Tested', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80' },
  { label: 'New LED Streetlight Lit', url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80' },
  { label: 'Drain Desilted & Cleared', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80' },
];
