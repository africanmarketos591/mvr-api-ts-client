import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import {
  DecisionCheckRequest,
  ContextCompileRequest,
  EntityResolveRequest,
  EvidenceCompletenessRequest,
  MVRApiErrorEnvelope,
  MVRClientConfig,
  MVRGenericResponse
} from "./types";

export class MVRApiError extends Error {
  public readonly status?: number;
  public readonly errorData: MVRApiErrorEnvelope;

  constructor(message: string, errorData: MVRApiErrorEnvelope = {}, status?: number) {
    super(message);
    this.name = "MVRApiError";
    this.status = status;
    this.errorData = errorData;
  }
}

export class MVRClient {
  private readonly client: AxiosInstance;
  private readonly config: Required<Pick<MVRClientConfig, "baseURL" | "apiKey" | "timeout" | "maxRetries" | "responseProfile">>;

  constructor(config: MVRClientConfig = {}) {
    this.config = {
      baseURL: config.baseURL ?? "https://africanmarketos.com",
      apiKey: config.apiKey ?? process.env.MVR_API_KEY ?? "mvr-demo-key-2026",
      timeout: config.timeout ?? 90000,
      maxRetries: config.maxRetries ?? 1,
      responseProfile: config.responseProfile ?? "full_advisory"
    };

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": this.config.apiKey,
        "X-Response-Profile": this.config.responseProfile,
        "User-Agent": "@africanmarketos/mvr-api-client/6.32.1"
      }
    });
  }

  private async request<T = MVRGenericResponse>(config: AxiosRequestConfig): Promise<T> {
    for (let attempt = 0; attempt <= this.config.maxRetries; attempt += 1) {
      try {
        const response = await this.client.request<T>(config);
        return response.data;
      } catch (err) {
        const axiosErr = err as AxiosError<MVRApiErrorEnvelope>;
        const status = axiosErr.response?.status;
        const data = axiosErr.response?.data ?? {};

        if (status === 429 && attempt < this.config.maxRetries) {
          const retryAfter = Number(axiosErr.response?.headers?.["retry-after"] ?? 2);
          await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
          continue;
        }

        if (axiosErr.response) {
          throw new MVRApiError(
            data.message || data.error || `MVR API HTTP ${status}`,
            data,
            status
          );
        }

        if (attempt === this.config.maxRetries) {
          throw new MVRApiError(axiosErr.message || "MVR API network error", {
            error: "NETWORK_ERROR",
            message: axiosErr.message
          });
        }
      }
    }

    throw new MVRApiError("MVR API request failed", { error: "UNKNOWN_ERROR" });
  }

  authCheck(): Promise<MVRGenericResponse> {
    return this.request({ method: "POST", url: "/v1/auth-check", data: {} });
  }

  entityResolve(payload: EntityResolveRequest): Promise<MVRGenericResponse> {
    return this.request({ method: "POST", url: "/v1/entity-resolve", data: payload });
  }

  evidenceCompleteness(payload: EvidenceCompletenessRequest): Promise<MVRGenericResponse> {
    return this.request({ method: "POST", url: "/v1/evidence-completeness", data: payload });
  }

  contextCompile(payload: ContextCompileRequest): Promise<MVRGenericResponse> {
    return this.request({ method: "POST", url: "/v1/context/compile", data: payload });
  }

  decisionCheck(payload: DecisionCheckRequest): Promise<MVRGenericResponse> {
    return this.request({ method: "POST", url: "/v1/decision-check", data: payload });
  }

  modelCard(): Promise<MVRGenericResponse> {
    return this.request({ method: "GET", url: "/v1/model-card" });
  }

  capabilities(): Promise<MVRGenericResponse> {
    return this.request({ method: "GET", url: "/v1/capabilities" });
  }

  health(): Promise<MVRGenericResponse> {
    return this.request({ method: "GET", url: "/health" });
  }
}

export { MVRClient as MVRApiClient };

