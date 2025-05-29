import {appService} from "./appService";
import { AxiosResponse } from "axios";
import { Subject } from "../types/subject";
import { subjects } from "../services/mock/app";
import { createMockAxiosResponse } from "../utils/mockUtils";

jest.mock("../utils/mockUtils", () => ({
  createMockAxiosResponse: jest.fn(),
}));

describe("AppService", () => {
  // it("should return a list of subjects with a delay", async () => {
  //   // Mock the response
  //   const mockResponse = createMockAxiosResponse(subjects) as unknown as AxiosResponse<Subject[]>;
  //   (createMockAxiosResponse as jest.Mock).mockReturnValue(mockResponse);
  //
  //   // Record the start time
  //   const startTime = Date.now();
  //
  //   // Call the method
  //   const response = await appService.getAllSubjects();
  //
  //   // Calculate time taken
  //   const timeTaken = Date.now() - startTime;
  //
  //   // Assertions
  //   expect(response).toEqual(mockResponse); // Check response data
  //   expect(response.data).toEqual(subjects); // Ensure correct subjects
  //   expect(timeTaken).toBeGreaterThanOrEqual(500); // Ensure delay of at least 500ms
  // });
});
