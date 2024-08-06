import request from "supertest";
import app from "../main";
import 'dotenv/config';

jest.mock('../auth', () => ({
  apiKeyAuth: (req, res, next) => {
    req.apiKeyValid = true;
    next();
  }
}));

describe('GET /workers/:job', () => {
    it('should return workers for the given job', async () => {
      const job = 'developer';
      const mockWorkers = [
        { id: 1, name: 'John Doe', job: 'developer' },
        { id: 2, name: 'Jane Doe', job: 'developer' }
      ];
  
      // Mock the getWorkers function
      jest.mock('../main', () => ({
        ...jest.requireActual('../main'),
        getWorkers: jest.fn().mockResolvedValue(mockWorkers)
      }));
  
      const response = await request(app).get(`/workers/${job}`).set('x-api-key', 'valid_api_key');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockWorkers);
    });
  
    it('should return 500 if there is an internal server error', async () => {
      const job = 'developer';
  
      // Mock the getWorkers function to throw an error
      jest.mock('../main', () => ({
        ...jest.requireActual('../main'),
        getWorkers: jest.fn().mockRejectedValue(new Error('Internal Server Error'))
      }));
  
      const response = await request(app).get(`/workers/${job}`).set('x-api-key', 'valid_api_key');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });
  
