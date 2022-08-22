import { NextFunction, Request, Response } from "express";
import { TaskBusiness } from "../../core/entities/taks.entity";
import { UserBusiness } from "../../core/entities/user.entity";
import { AuthMiddleware } from "../auth.middleware";

describe("Ensure Auth Middleware works", () => {
    let MOCK_MANAGER_AUTHENTICATED_REQUEST;
    let MOCK_TECH_AUTHENTICATED_REQUEST;
    let MOCk_NOT_AUTHENTICATED_REQUEST;
    let MOCK_NEXT_FUNCTION;
    let MOCK_RESPONSE_OBJECT;

    beforeAll(() => {
        const MOCK_MANAGER: UserBusiness.User = {
            id: 1,
            role: UserBusiness.Roles.MANAGER,
            username: "admin",
            password: "admin",
            tasks: [],
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const MOCK_TASK: TaskBusiness.Task = {
            id: 1,
            user: MOCK_MANAGER,
            summary: "Minha task",
            status: TaskBusiness.Status.TODO,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    })

    beforeEach(() => {
        MOCK_MANAGER_AUTHENTICATED_REQUEST = {
            sessionID: "abcd",
            session: {
                userId: "admin",
                userRole: UserBusiness.Roles.MANAGER
            },
            params: {
                id: null
            }
        } as unknown as Request;
        
        MOCK_TECH_AUTHENTICATED_REQUEST = {
            sessionID: "abcd",
            session:  {
                userId: 1,
                userRole: 'Tech'
            }, 
        } as unknown as Request;
        
        MOCk_NOT_AUTHENTICATED_REQUEST = {
            sessionID: undefined,
            session: undefined
        } as unknown as Request;
        
        MOCK_NEXT_FUNCTION = jest.fn();
        
        MOCK_RESPONSE_OBJECT = {
            status: jest.fn(() => MOCK_RESPONSE_OBJECT),
            json: jest.fn().mockReturnThis()
        } as unknown as Response;
    })
    it("should be error if user is not authenticated", () => {
        AuthMiddleware.checkAuthentication(
            MOCk_NOT_AUTHENTICATED_REQUEST, 
            MOCK_RESPONSE_OBJECT, 
            MOCK_NEXT_FUNCTION
        );

        expect(MOCK_NEXT_FUNCTION).not.toHaveBeenCalled();
        expect(MOCK_RESPONSE_OBJECT.status).toHaveBeenCalledWith(401);
    });

    it("should let user pass if authenticated", () => {
        AuthMiddleware.checkAuthentication(
            MOCK_MANAGER_AUTHENTICATED_REQUEST, 
            MOCK_RESPONSE_OBJECT, 
            MOCK_NEXT_FUNCTION
        );

        expect(MOCK_NEXT_FUNCTION).toHaveBeenCalled();
    })

    it("should let Manager user pass on every request", () => {
        AuthMiddleware.checkPermissions(
            MOCK_MANAGER_AUTHENTICATED_REQUEST,
            MOCK_RESPONSE_OBJECT,
            MOCK_NEXT_FUNCTION
        );

        expect(MOCK_NEXT_FUNCTION).toHaveBeenCalled();
    });

    it("should prevent Tech User to make delete requests", () => {
        let request = MOCK_TECH_AUTHENTICATED_REQUEST;
        request.method = 'DELETE';
        request.params = {
            id: "1"
        }

        AuthMiddleware.checkPermissions(
            request,
            MOCK_RESPONSE_OBJECT,
            MOCK_NEXT_FUNCTION
        );

        expect(MOCK_NEXT_FUNCTION).not.toHaveBeenCalled();
        expect(MOCK_RESPONSE_OBJECT.status).toHaveBeenCalledWith(403);
    });

    it("should let Tech user make requests that affects itself", () => {
        let request = MOCK_TECH_AUTHENTICATED_REQUEST;
        request.method = 'POST';
        request.params = {
            id: "1"
        }

        AuthMiddleware.checkPermissions(
            request,
            MOCK_RESPONSE_OBJECT,
            MOCK_NEXT_FUNCTION
        );

        expect(MOCK_NEXT_FUNCTION).toHaveBeenCalled();
    })

    it("should prevent Tech User to make request that affects another user", () => {
        let request = MOCK_TECH_AUTHENTICATED_REQUEST;
        request.method = 'POST';
        request.params = {
            id: "2"
        }

        AuthMiddleware.checkPermissions(
            request,
            MOCK_RESPONSE_OBJECT,
            MOCK_NEXT_FUNCTION
        );

        expect(MOCK_NEXT_FUNCTION).not.toHaveBeenCalled();
        expect(MOCK_RESPONSE_OBJECT.status).toHaveBeenCalledWith(403);
    })
});