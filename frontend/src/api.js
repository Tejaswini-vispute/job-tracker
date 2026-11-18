// API client for JobTracker Spring Boot + MongoDB Backend

const API_BASE = "/api";

function getToken() {
  return localStorage.getItem("jt_token") || "";
}

function setToken(token) {
  if (token) {
    localStorage.setItem("jt_token", token);
  } else {
    localStorage.removeItem("jt_token");
  }
}

async function request(path, options = {}) {
  const headers = {
    Accept: "application/json",
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    const errorMsg = json?.message || (typeof json === "string" ? json : `HTTP ${res.status}`);
    throw new Error(errorMsg);
  }

  return json?.data !== undefined ? json.data : json;
}

export const api = {
  getToken,
  setToken,

  // Auth
  async login(email, password, role) {
    const res = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
    });
    if (res?.token) {
      setToken(res.token);
    }
    return res.user;
  },

  async register(name, email, password, role, code) {
    const res = await request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, role, code }),
    });
    if (res?.token) {
      setToken(res.token);
    }
    return res.user;
  },

  async getMe() {
    return request("/auth/me");
  },

  logout() {
    setToken(null);
  },

  // Users & Profile
  async getProfile() {
    return request("/users/profile");
  },

  async updateProfile(profile) {
    const res = await request("/users/profile", {
      method: "PUT",
      body: JSON.stringify(profile),
    });

    if (res?.token) setToken(res.token);
    return res?.user || res;
  },
  async changePassword(payload) {
    return request("/users/change-password", {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  async getJobSeekers() {
    return request("/users/job-seekers");
  },

  async getAllUsers() {
    return request("/users");
  },

  // Jobs
  async getJobs(q) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    const queryStr = params.toString() ? `?${params.toString()}` : "";
    return request(`/jobs${queryStr}`);
  },

  async getJobsByCareerCategory(category) {
    return request(`/jobs/category/${encodeURIComponent(category)}`);
  },

  async createJob(jobData) {
    return request("/jobs", {
      method: "POST",
      body: JSON.stringify(jobData),
    });
  },

  async deleteJob(jobId) {
    return request(`/jobs/${jobId}`, {
      method: "DELETE",
    });
  },

    // Notifications
  async getReadNotificationIds() {
    return request("/notifications/read-ids");
  },

  async markAllNotificationsAsRead() {
    return request("/notifications/read-all", {
      method: "PUT",
    });
  },
// Applications
  async getApplications() {
    return request("/applications");
  },

  async applyJob(appData) {
    return request("/applications", {
      method: "POST",
      body: JSON.stringify(appData),
    });
  },

  async updateApplicationStatus(id, patch) {
    return request(`/applications/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({
        status: patch.s || patch.status,
        interviewDate: patch.iv !== undefined ? patch.iv : patch.interviewDate,
      }),
    });
  },

  async deleteApplication(id) {
    return request(`/applications/${id}`, {
      method: "DELETE",
    });
  },

  // Saved Jobs
  async getSavedJobs() {
    return request("/saved-jobs");
  },

  async saveJob(jobId, date) {
    const query = date ? `?date=${encodeURIComponent(date)}` : "";
    return request(`/saved-jobs/${jobId}${query}`, {
      method: "POST",
    });
  },

  async unsaveJob(jobId) {
    return request(`/saved-jobs/${jobId}`, {
      method: "DELETE",
    });
  },

  // Documents
  async getDocuments() {
    return request("/documents");
  },

  async addDocument(name, size) {
    return request("/documents", {
      method: "POST",
      body: JSON.stringify({ name, size }),
    });
  },

  async uploadDocument(file) {
    const form = new FormData();
    form.append("file", file);
    return request("/documents/upload", {
      method: "POST",
      body: form,
    });
  },

  async deleteDocument(id) {
    return request(`/documents/${id}`, {
      method: "DELETE",
    });
  },

  getDocumentDownloadUrl(id) {
    const token = getToken();
    return `${API_BASE}/documents/${id}/download?token=${encodeURIComponent(token)}`;
  },

  getDocumentViewUrl(id) {
    const token = getToken();
    return `${API_BASE}/documents/${id}/view?token=${encodeURIComponent(token)}`;
  },

  // Dashboard stats
  async getDashboardStats() {
    return request("/dashboard/stats");
  },
};


