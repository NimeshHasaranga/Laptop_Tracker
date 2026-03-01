import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../src/models/User.js';
import Laptop from '../src/models/Laptop.js';
import AuditLog from '../src/models/AuditLog.js';

dotenv.config();

const sampleData = {
  users: [
    {
      username: 'admin',
      taNumber: 'TA-ADMIN-001',
      role: 'admin',
      isActive: true
    },
    {
      username: 'tech1',
      taNumber: 'TA-TECH-001',
      role: 'staff',
      isActive: true
    },
    {
      username: 'tech2',
      taNumber: 'TA-TECH-002',
      role: 'staff',
      isActive: true
    },
    {
      username: 'tech3',
      taNumber: 'TA-TECH-003',
      role: 'staff',
      isActive: true
    },
    {
      username: 'manager1',
      taNumber: 'TA-MGR-001',
      role: 'staff',
      isActive: true
    },
    {
      username: 'intern1',
      taNumber: 'TA-INT-001',
      role: 'staff',
      isActive: true
    }
  ],
  laptops: [
    {
      serialNumber: 'SN001234567',
      assetTag: 'LT-001',
      make: 'Dell',
      model: 'Latitude 7420',
      computerName: 'DELL-LT-001',
      department: 'IT',
      assignedUserName: 'John Smith',
      officeLicense: {
        type: 'O365',
        activated: true
      },
      jobNo: 'JOB-2024-001',
      status: 'configured',
      purchaseDate: new Date('2024-01-10'),
      warrantyExpiry: new Date('2027-01-10'),
      software: [
        {
          name: 'Microsoft Office',
          installed: true,
          version: '2021',
          installedAt: new Date('2024-01-15T10:30:00Z')
        },
        {
          name: 'Google Chrome',
          installed: true,
          version: '120.0.6099.129',
          installedAt: new Date('2024-01-15T11:00:00Z')
        },
        {
          name: 'Adobe Reader',
          installed: true,
          version: '23.008.20470',
          installedAt: new Date('2024-01-15T11:30:00Z')
        },
        {
          name: 'VPN Client',
          installed: false,
          version: ''
        }
      ],
      domainConfigured: true,
      handedOver: true,
      assetLabeled: true
    },
    {
      serialNumber: 'SN001234568',
      assetTag: 'LT-002',
      make: 'HP',
      model: 'EliteBook 840 G9',
      computerName: 'HP-LT-002',
      department: 'Finance',
      assignedUserName: 'Sarah Johnson',
      officeLicense: {
        type: 'Volume',
        activated: false
      },
      jobNo: 'JOB-2024-002',
      status: 'in-setup',
      purchaseDate: new Date('2024-02-05'),
      warrantyExpiry: new Date('2027-02-05'),
      software: [
        {
          name: 'Microsoft Office',
          installed: true,
          version: '2021',
          installedAt: new Date('2024-02-06T09:00:00Z')
        },
        {
          name: 'QuickBooks',
          installed: false,
          version: ''
        }
      ],
      domainConfigured: false,
      handedOver: false,
      assetLabeled: true
    },
    {
      serialNumber: 'SN001234569',
      assetTag: 'LT-003',
      make: 'Lenovo',
      model: 'ThinkPad X1 Carbon',
      computerName: '',
      department: '',
      assignedUserName: '',
      officeLicense: {
        type: 'OEM',
        activated: false
      },
      jobNo: '',
      status: 'received',
      purchaseDate: new Date('2024-02-20'),
      warrantyExpiry: new Date('2027-02-20'),
      software: [],
      domainConfigured: false,
      handedOver: false,
      assetLabeled: false
    },
    {
      serialNumber: 'SN001234570',
      assetTag: 'LT-004',
      make: 'Dell',
      model: 'XPS 15',
      computerName: 'DELL-XPS-004',
      department: 'Marketing',
      assignedUserName: 'Emily Davis',
      officeLicense: {
        type: 'O365',
        activated: true
      },
      jobNo: 'JOB-2024-003',
      status: 'handed-over',
      purchaseDate: new Date('2023-12-15'),
      warrantyExpiry: new Date('2026-12-15'),
      software: [
        {
          name: 'Microsoft Office',
          installed: true,
          version: '2021',
          installedAt: new Date('2023-12-20T10:00:00Z')
        },
        {
          name: 'Adobe Creative Suite',
          installed: true,
          version: '2024',
          installedAt: new Date('2023-12-20T14:00:00Z')
        },
        {
          name: 'Google Chrome',
          installed: true,
          version: '120.0.6099.129',
          installedAt: new Date('2023-12-20T15:00:00Z')
        }
      ],
      domainConfigured: true,
      handedOver: true,
      assetLabeled: true
    },
    {
      serialNumber: 'SN001234571',
      assetTag: 'LT-005',
      make: 'Apple',
      model: 'MacBook Pro 14"',
      computerName: 'MAC-PRO-005',
      department: 'Design',
      assignedUserName: 'Michael Chen',
      officeLicense: {
        type: 'O365',
        activated: true
      },
      jobNo: 'JOB-2024-004',
      status: 'configured',
      purchaseDate: new Date('2024-01-25'),
      warrantyExpiry: new Date('2027-01-25'),
      software: [
        {
          name: 'Microsoft Office',
          installed: true,
          version: '2021',
          installedAt: new Date('2024-01-26T09:00:00Z')
        },
        {
          name: 'Adobe Creative Suite',
          installed: true,
          version: '2024',
          installedAt: new Date('2024-01-26T11:00:00Z')
        },
        {
          name: 'Sketch',
          installed: true,
          version: '98.3',
          installedAt: new Date('2024-01-26T13:00:00Z')
        },
        {
          name: 'Final Cut Pro',
          installed: false,
          version: ''
        }
      ],
      domainConfigured: true,
      handedOver: false,
      assetLabeled: true
    },
    {
      serialNumber: 'SN001234572',
      assetTag: 'LT-006',
      make: 'HP',
      model: 'Pavilion 15',
      computerName: 'HP-PAV-006',
      department: 'HR',
      assignedUserName: 'Lisa Anderson',
      officeLicense: {
        type: 'Volume',
        activated: true
      },
      jobNo: 'JOB-2024-005',
      status: 'handed-over',
      purchaseDate: new Date('2023-11-10'),
      warrantyExpiry: new Date('2026-11-10'),
      software: [
        {
          name: 'Microsoft Office',
          installed: true,
          version: '2021',
          installedAt: new Date('2023-11-15T10:00:00Z')
        },
        {
          name: 'Google Chrome',
          installed: true,
          version: '119.0.6045.199',
          installedAt: new Date('2023-11-15T11:00:00Z')
        },
        {
          name: 'HR Management System',
          installed: true,
          version: '3.2.1',
          installedAt: new Date('2023-11-15T14:00:00Z')
        }
      ],
      domainConfigured: true,
      handedOver: true,
      assetLabeled: true
    },
    {
      serialNumber: 'SN001234573',
      assetTag: 'LT-007',
      make: 'Lenovo',
      model: 'ThinkPad E14',
      computerName: '',
      department: 'Sales',
      assignedUserName: '',
      officeLicense: {
        type: 'O365',
        activated: false
      },
      jobNo: 'JOB-2024-006',
      status: 'received',
      purchaseDate: new Date('2024-03-01'),
      warrantyExpiry: new Date('2027-03-01'),
      software: [],
      domainConfigured: false,
      handedOver: false,
      assetLabeled: false
    },
    {
      serialNumber: 'SN001234574',
      assetTag: 'LT-008',
      make: 'Dell',
      model: 'Inspiron 16',
      computerName: 'DELL-INS-008',
      department: 'Sales',
      assignedUserName: 'Robert Wilson',
      officeLicense: {
        type: 'OEM',
        activated: false
      },
      jobNo: 'JOB-2024-007',
      status: 'in-setup',
      purchaseDate: new Date('2024-02-28'),
      warrantyExpiry: new Date('2027-02-28'),
      software: [
        {
          name: 'Microsoft Office',
          installed: true,
          version: '2021',
          installedAt: new Date('2024-02-29T09:00:00Z')
        },
        {
          name: 'Salesforce CRM',
          installed: false,
          version: ''
        }
      ],
      domainConfigured: false,
      handedOver: false,
      assetLabeled: true
    },
    {
      serialNumber: 'SN001234575',
      assetTag: 'LT-009',
      make: 'Apple',
      model: 'MacBook Air M2',
      computerName: 'MAC-AIR-009',
      department: 'Executive',
      assignedUserName: 'Jennifer Taylor',
      officeLicense: {
        type: 'O365',
        activated: true
      },
      jobNo: 'JOB-2024-008',
      status: 'handed-over',
      purchaseDate: new Date('2024-01-05'),
      warrantyExpiry: new Date('2027-01-05'),
      software: [
        {
          name: 'Microsoft Office',
          installed: true,
          version: '2021',
          installedAt: new Date('2024-01-06T10:00:00Z')
        },
        {
          name: 'Google Chrome',
          installed: true,
          version: '121.0.6167.85',
          installedAt: new Date('2024-01-06T11:00:00Z')
        },
        {
          name: 'Zoom',
          installed: true,
          version: '5.16.6',
          installedAt: new Date('2024-01-06T12:00:00Z')
        }
      ],
      domainConfigured: true,
      handedOver: true,
      assetLabeled: true
    },
    {
      serialNumber: 'SN001234576',
      assetTag: 'LT-010',
      make: 'Microsoft',
      model: 'Surface Laptop 5',
      computerName: 'SURFACE-010',
      department: 'IT',
      assignedUserName: 'David Martinez',
      officeLicense: {
        type: 'Volume',
        activated: true
      },
      jobNo: 'JOB-2024-009',
      status: 'configured',
      purchaseDate: new Date('2024-02-15'),
      warrantyExpiry: new Date('2027-02-15'),
      software: [
        {
          name: 'Microsoft Office',
          installed: true,
          version: '2021',
          installedAt: new Date('2024-02-16T09:00:00Z')
        },
        {
          name: 'Visual Studio Code',
          installed: true,
          version: '1.85.1',
          installedAt: new Date('2024-02-16T10:00:00Z')
        },
        {
          name: 'Docker Desktop',
          installed: true,
          version: '4.26.1',
          installedAt: new Date('2024-02-16T11:00:00Z')
        },
        {
          name: 'Git',
          installed: true,
          version: '2.43.0',
          installedAt: new Date('2024-02-16T12:00:00Z')
        }
      ],
      domainConfigured: true,
      handedOver: false,
      assetLabeled: true
    },
    {
      serialNumber: 'SN001234577',
      assetTag: 'LT-011',
      make: 'ASUS',
      model: 'ZenBook 14',
      computerName: '',
      department: '',
      assignedUserName: '',
      officeLicense: {
        type: 'None',
        activated: false
      },
      jobNo: '',
      status: 'received',
      purchaseDate: new Date('2024-03-05'),
      warrantyExpiry: new Date('2027-03-05'),
      software: [],
      domainConfigured: false,
      handedOver: false,
      assetLabeled: false
    },
    {
      serialNumber: 'SN001234578',
      assetTag: 'LT-012',
      make: 'HP',
      model: 'Spectre x360',
      computerName: 'HP-SPECTRE-012',
      department: 'Finance',
      assignedUserName: 'Amanda White',
      officeLicense: {
        type: 'O365',
        activated: true
      },
      jobNo: 'JOB-2024-010',
      status: 'handed-over',
      purchaseDate: new Date('2023-10-20'),
      warrantyExpiry: new Date('2026-10-20'),
      software: [
        {
          name: 'Microsoft Office',
          installed: true,
          version: '2021',
          installedAt: new Date('2023-10-25T10:00:00Z')
        },
        {
          name: 'QuickBooks',
          installed: true,
          version: '2023',
          installedAt: new Date('2023-10-25T11:00:00Z')
        },
        {
          name: 'Excel Power Query',
          installed: true,
          version: '2.80.5233.642',
          installedAt: new Date('2023-10-25T12:00:00Z')
        }
      ],
      domainConfigured: true,
      handedOver: true,
      assetLabeled: true
    }
  ]
};

async function seedDatabase() {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Laptop.deleteMany({});
    await AuditLog.deleteMany({});
    console.log('✅ Cleared existing data');

    // Create users
    console.log('👥 Creating users...');
    const createdUsers = [];
    for (const userData of sampleData.users) {
      const user = new User(userData);
      await user.save();
      createdUsers.push(user);
      console.log(`✅ Created user: ${user.username}`);
    }

    // Create laptops and assign references
    console.log('💻 Creating laptops...');
    const createdLaptops = [];
    for (let i = 0; i < sampleData.laptops.length; i++) {
      const laptopData = { ...sampleData.laptops[i] };
      
      // Assign creator (admin user for first 2, tech1 for third)
      laptopData.createdBy = createdUsers[0]._id;
      
      // Assign technician for laptops 1 and 2
      if (i < 2) {
        laptopData.technician = createdUsers[i + 1]._id;
      }
      
      // Assign software installers
      laptopData.software = laptopData.software.map(software => {
        if (software.installed && software.installedAt) {
          return {
            ...software,
            installedBy: createdUsers[i + 1]?._id || createdUsers[0]._id
          };
        }
        return software;
      });
      
      const laptop = new Laptop(laptopData);
      await laptop.save();
      createdLaptops.push(laptop);
      console.log(`✅ Created laptop: ${laptop.serialNumber}`);
    }

    // Create audit logs
    console.log('📋 Creating audit logs...');
    const auditLogs = [
      {
        entity: 'laptop',
        entityId: createdLaptops[0]._id,
        action: 'create',
        changedBy: createdUsers[0]._id,
        changedAt: new Date('2024-01-15T09:00:00Z'),
        diff: [
          { path: 'serialNumber', from: null, to: 'SN001234567' },
          { path: 'make', from: null, to: 'Dell' },
          { path: 'model', from: null, to: 'Latitude 7420' }
        ]
      },
      {
        entity: 'laptop',
        entityId: createdLaptops[1]._id,
        action: 'create',
        changedBy: createdUsers[0]._id,
        changedAt: new Date('2024-02-06T08:00:00Z'),
        diff: [
          { path: 'serialNumber', from: null, to: 'SN001234568' },
          { path: 'make', from: null, to: 'HP' },
          { path: 'model', from: null, to: 'EliteBook 840 G9' }
        ]
      },
      {
        entity: 'laptop',
        entityId: createdLaptops[2]._id,
        action: 'create',
        changedBy: createdUsers[0]._id,
        changedAt: new Date('2024-02-21T10:00:00Z'),
        diff: [
          { path: 'serialNumber', from: null, to: 'SN001234569' },
          { path: 'make', from: null, to: 'Lenovo' },
          { path: 'model', from: null, to: 'ThinkPad X1 Carbon' }
        ]
      },
      {
        entity: 'user',
        entityId: createdUsers[1]._id,
        action: 'login',
        changedBy: createdUsers[1]._id,
        changedAt: new Date('2024-03-01T09:30:00Z'),
        diff: []
      }
    ];

    for (const auditLog of auditLogs) {
      const log = new AuditLog(auditLog);
      await log.save();
      console.log(`✅ Created audit log for ${auditLog.entity} ${auditLog.action}`);
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Users: ${createdUsers.length}`);
    console.log(`- Laptops: ${createdLaptops.length}`);
    console.log(`- Audit Logs: ${auditLogs.length}`);
    
    console.log('\n🔑 Login Credentials:');
    console.log('- Admin: username="admin", taNumber="TA-ADMIN-001"');
    console.log('- Tech 1: username="tech1", taNumber="TA-TECH-001"');
    console.log('- Tech 2: username="tech2", taNumber="TA-TECH-002"');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the seed function
seedDatabase();
