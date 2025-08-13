# API Documentation

This document provides detailed information about the Laboratory Automation Data Platform REST API.

## Base URL

```
Development: http://localhost:3001/api
Production: https://your-domain.com/api
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Response Format

All API responses follow this format:

```json
{
  "success": true|false,
  "data": {
    // Response data
  },
  "error": {
    "message": "Error message"
  }
}
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "firstName": "John",
  "lastName": "Doe",
  "password": "securepassword",
  "role": "USER",
  "department": "Genomics"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "username": "username",
      "firstName": "John",
      "lastName": "Doe",
      "role": "USER",
      "department": "Genomics",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token"
  }
}
```

#### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

#### Get Current User
```http
GET /auth/me
```

**Headers:**
```
Authorization: Bearer <token>
```

### Sample Management

#### List Samples
```http
GET /samples?page=1&limit=10&search=DNA&type=DNA&status=RECEIVED&projectId=proj_123
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term for name, sampleId, or description
- `type` (optional): Sample type filter
- `status` (optional): Sample status filter
- `projectId` (optional): Project ID filter

**Response:**
```json
{
  "success": true,
  "data": {
    "samples": [
      {
        "id": "sample_id",
        "sampleId": "S001",
        "name": "Sample 1",
        "type": "DNA",
        "status": "RECEIVED",
        "description": "Blood sample",
        "volume": 100.5,
        "concentration": 25.3,
        "storageLocation": "Freezer A1",
        "receivedDate": "2024-01-01T00:00:00.000Z",
        "project": {
          "id": "project_id",
          "name": "Project Name"
        },
        "creator": {
          "id": "user_id",
          "firstName": "John",
          "lastName": "Doe"
        },
        "_count": {
          "libraries": 2,
          "sequencingRuns": 1,
          "analysisResults": 3
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "pages": 5
    }
  }
}
```

#### Get Sample by ID
```http
GET /samples/:id
```

#### Create Sample
```http
POST /samples
```

**Request Body:**
```json
{
  "sampleId": "S001",
  "name": "Sample 1",
  "type": "DNA",
  "description": "Blood sample from patient",
  "volume": 100.5,
  "concentration": 25.3,
  "storageLocation": "Freezer A1",
  "barcodeId": "BC001",
  "expiryDate": "2025-01-01T00:00:00.000Z",
  "projectId": "project_id",
  "creatorId": "user_id"
}
```

#### Update Sample
```http
PUT /samples/:id
```

#### Delete Sample
```http
DELETE /samples/:id
```

#### Sample Statistics
```http
GET /samples/stats/overview
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalSamples": 150,
    "samplesByStatus": [
      { "status": "RECEIVED", "_count": { "status": 50 } },
      { "status": "PROCESSING", "_count": { "status": 30 } },
      { "status": "READY", "_count": { "status": 70 } }
    ],
    "samplesByType": [
      { "type": "DNA", "_count": { "type": 80 } },
      { "type": "RNA", "_count": { "type": 50 } },
      { "type": "PROTEIN", "_count": { "type": 20 } }
    ],
    "recentSamples": 25
  }
}
```

### Reagent Management

#### List Reagents
```http
GET /reagents
```

**Response:**
```json
{
  "success": true,
  "data": {
    "reagents": [
      {
        "id": "reagent_id",
        "name": "Taq Polymerase",
        "manufacturer": "ThermoFisher",
        "catalogNumber": "EP0401",
        "lotNumber": "LOT123",
        "concentration": "5 U/μL",
        "volume": 500,
        "unit": "μL",
        "expiryDate": "2025-06-01T00:00:00.000Z",
        "storageTemp": "-20°C",
        "location": "Freezer B2",
        "status": "AVAILABLE",
        "minimumStock": 100,
        "currentStock": 450,
        "cost": 150.00,
        "supplier": "ThermoFisher Scientific"
      }
    ]
  }
}
```

#### Create Reagent
```http
POST /reagents
```

**Request Body:**
```json
{
  "name": "Taq Polymerase",
  "manufacturer": "ThermoFisher",
  "catalogNumber": "EP0401",
  "lotNumber": "LOT123",
  "concentration": "5 U/μL",
  "volume": 500,
  "unit": "μL",
  "expiryDate": "2025-06-01T00:00:00.000Z",
  "storageTemp": "-20°C",
  "location": "Freezer B2",
  "minimumStock": 100,
  "currentStock": 500,
  "cost": 150.00,
  "supplier": "ThermoFisher Scientific"
}
```

### Library Management

#### List Libraries
```http
GET /library
```

#### Create Library
```http
POST /library
```

### Sequencing Management

#### List Sequencing Runs
```http
GET /sequencing
```

#### Create Sequencing Run
```http
POST /sequencing
```

### Analysis Management

#### List Analyses
```http
GET /analysis
```

#### Create Analysis
```http
POST /analysis
```

### User Management

#### List Users
```http
GET /users
```

### Project Management

#### List Projects
```http
GET /projects
```

#### Create Project
```http
POST /projects
```

### Workflow Management

#### List Workflows
```http
GET /workflow
```

#### Create Workflow
```http
POST /workflow
```

## Error Codes

| Code | Description |
|------|-------------|
| 200  | Success |
| 201  | Created |
| 400  | Bad Request |
| 401  | Unauthorized |
| 403  | Forbidden |
| 404  | Not Found |
| 409  | Conflict |
| 422  | Unprocessable Entity |
| 500  | Internal Server Error |

## Rate Limiting

The API implements rate limiting:
- 100 requests per 15 minutes per IP address
- Authenticated users may have higher limits

## WebSocket Events

The platform supports real-time updates via Socket.IO:

### Events

#### Connection
```javascript
// Client connects
socket.emit('join-lab', labId);
```

#### Sample Updates
```javascript
// Real-time sample status updates
socket.on('sample-updated', (data) => {
  console.log('Sample updated:', data);
});
```

#### Workflow Updates
```javascript
// Real-time workflow progress
socket.on('workflow-progress', (data) => {
  console.log('Workflow progress:', data);
});
```

## Data Types and Enums

### Sample Types
- `DNA`
- `RNA`
- `PROTEIN`
- `CELL_CULTURE`
- `TISSUE`
- `BLOOD`
- `SERUM`
- `PLASMA`
- `OTHER`

### Sample Status
- `RECEIVED`
- `PROCESSING`
- `READY`
- `USED`
- `DEPLETED`
- `DISCARDED`

### Library Types
- `WHOLE_GENOME`
- `EXOME`
- `RNA_SEQ`
- `CHIP_SEQ`
- `ATAC_SEQ`
- `AMPLICON`
- `METAGENOME`
- `OTHER`

### Sequencing Platforms
- `ILLUMINA_NOVASEQ`
- `ILLUMINA_HISEQ`
- `ILLUMINA_MISEQ`
- `OXFORD_NANOPORE`
- `PACBIO`
- `OTHER`

### User Roles
- `ADMIN`
- `LAB_MANAGER`
- `SCIENTIST`
- `TECHNICIAN`
- `USER`

## SDKs and Examples

### JavaScript/Node.js Example

```javascript
const API_BASE = 'http://localhost:3001/api';

// Login
const login = async (email, password) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  return data.data.token;
};

// Get samples
const getSamples = async (token) => {
  const response = await fetch(`${API_BASE}/samples`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  return response.json();
};

// Create sample
const createSample = async (token, sampleData) => {
  const response = await fetch(`${API_BASE}/samples`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(sampleData),
  });
  
  return response.json();
};
```

### Python Example

```python
import requests

API_BASE = 'http://localhost:3001/api'

class LabAPI:
    def __init__(self):
        self.token = None
    
    def login(self, email, password):
        response = requests.post(f'{API_BASE}/auth/login', json={
            'email': email,
            'password': password
        })
        data = response.json()
        self.token = data['data']['token']
        return self.token
    
    def get_samples(self, **params):
        headers = {'Authorization': f'Bearer {self.token}'}
        response = requests.get(f'{API_BASE}/samples', 
                              headers=headers, params=params)
        return response.json()
    
    def create_sample(self, sample_data):
        headers = {
            'Authorization': f'Bearer {self.token}',
            'Content-Type': 'application/json'
        }
        response = requests.post(f'{API_BASE}/samples', 
                               headers=headers, json=sample_data)
        return response.json()
```

## Testing

Use the following endpoints to test the API:

### Health Check
```http
GET /health
```

Returns server status and uptime information.

### API Version
```http
GET /api/version
```

Returns API version information.

---

For more information or support, please refer to the main documentation or create an issue in the repository.