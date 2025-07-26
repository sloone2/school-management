import { Injectable } from '@angular/core';
import { ApiService, ExecutionOptions } from '../../../shared/service/api/api.service';
import { Observable } from 'rxjs';

// Group interfaces
export interface Group {
  id?: string;
  title: string;
  description: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  studentsCount?: number;
  instructorId?: string;
  instructorName?: string;
}

export interface GroupsResponse {
  data: Group[];
  total: number;
  page?: number;
  limit?: number;
}

export interface CreateGroupRequest {
  title: string;
  description: string;
  isActive?: boolean;
  instructorId?: string;
}

export interface UpdateGroupRequest {
  title?: string;
  description?: string;
  isActive?: boolean;
  instructorId?: string;
}

@Injectable({ providedIn: 'root' })
export class GroupsService {
  constructor(private api: ApiService) {}

  // ===== GROUPS CRUD OPERATIONS =====

  /**
   * Get all groups with enhanced error handling and progress tracking
   */
  public getGroups(options: ExecutionOptions<GroupsResponse> = {}): Observable<GroupsResponse> {
    return this.api.get<GroupsResponse>('/api/groups', undefined, {
      progressMessage: 'Loading groups...',
      showProgress: false, // Don't show progress for list operations
      showSuccessAlert: false, // Don't show success alert for read operations
      showErrorAlert: true,
      logErrors: true,
      ...options
    });
  }

  /**
   * Get groups with pagination and filtering
   */
  public getGroupsPaginated(
    page: number = 1,
    limit: number = 10,
    search?: string,
    options: ExecutionOptions<GroupsResponse> = {}
  ): Observable<GroupsResponse> {
    const params: any = { page, limit };
    if (search) {
      params.search = search;
    }

    return this.api.get<GroupsResponse>('/api/groups', params, {
      progressMessage: 'Loading groups...',
      showProgress: false,
      showSuccessAlert: false,
      showErrorAlert: true,
      logErrors: true,
      ...options
    });
  }

  /**
   * Create new group with confirmation and progress tracking
   */
  public createGroup(groupData: CreateGroupRequest, options: ExecutionOptions<Group> = {}): Observable<Group> {
    return this.api.post<Group>('/api/groups', groupData, {
      progressMessage: 'Creating group...',
      successMessage: 'Group created successfully!',
      showProgress: true,
      showSuccessAlert: true,
      showErrorAlert: true,
      logErrors: true,
      ...options
    });
  }

  /**
   * Create group with confirmation dialog
   */
  public createGroupWithConfirmation(
    groupData: CreateGroupRequest,
    options: ExecutionOptions<Group> = {}
  ): Observable<Group | { cancelled: boolean }> {
    return this.api.httpWithConfirmation(
      () => this.createGroup(groupData, { ...options, showSuccessAlert: false }),
      'save',
      {
        title: 'Create Group',
        text: `Create group "${groupData.title}"?`,
        confirmButton: 'Create Group'
      },
      {
        progressMessage: 'Creating group...',
        successMessage: 'Group created successfully!',
        ...options
      }
    );
  }

  /**
   * Update existing group
   */
  public updateGroup(
    id: string,
    groupData: UpdateGroupRequest,
    options: ExecutionOptions<Group> = {}
  ): Observable<Group> {
    return this.api.put<Group>(`/api/groups/${id}`, groupData, {
      progressMessage: 'Updating group...',
      successMessage: 'Group updated successfully!',
      showProgress: true,
      showSuccessAlert: true,
      showErrorAlert: true,
      logErrors: true,
      ...options
    });
  }

  /**
   * Update group with confirmation dialog
   */
  public updateGroupWithConfirmation(
    id: string,
    groupData: UpdateGroupRequest,
    options: ExecutionOptions<Group> = {}
  ): Observable<Group | { cancelled: boolean }> {
    return this.api.httpWithConfirmation(
      () => this.updateGroup(id, groupData, { ...options, showSuccessAlert: false }),
      'update',
      {
        title: 'Update Group',
        text: `Update group "${groupData.title}"?`,
        confirmButton: 'Update Group'
      },
      {
        progressMessage: 'Updating group...',
        successMessage: 'Group updated successfully!',
        ...options
      }
    );
  }

  /**
   * Delete group
   */
  public deleteGroup(id: string, options: ExecutionOptions<void> = {}): Observable<void> {
    return this.api.delete<void>(`/api/groups/${id}`, {
      progressMessage: 'Deleting group...',
      successMessage: 'Group deleted successfully!',
      showProgress: true,
      showSuccessAlert: true,
      showErrorAlert: true,
      logErrors: true,
      ...options
    });
  }

  /**
   * Delete group with confirmation dialog
   */
  public deleteGroupWithConfirmation(
    id: string,
    groupName?: string,
    options: ExecutionOptions<void> = {}
  ): Observable<void | { cancelled: boolean }> {
    return this.api.httpWithConfirmation(
      () => this.deleteGroup(id, { ...options, showSuccessAlert: false }),
      'delete',
      {
        title: 'Delete Group',
        text: groupName
          ? `Delete group "${groupName}"? This action cannot be undone.`
          : 'Delete this group? This action cannot be undone.',
        confirmButton: 'Delete Group'
      },
      {
        progressMessage: 'Deleting group...',
        successMessage: 'Group deleted successfully!',
        ...options
      }
    );
  }

  /**
   * Get single group by ID
   */
  public getGroupById(id: string, options: ExecutionOptions<Group> = {}): Observable<Group> {
    return this.api.get<Group>(`/api/groups/${id}`, undefined, {
      progressMessage: 'Loading group details...',
      showProgress: false,
      showSuccessAlert: false,
      showErrorAlert: true,
      logErrors: true,
      ...options
    });
  }

  // ===== ADDITIONAL GROUP OPERATIONS =====

  /**
   * Toggle group active status
   */
  public toggleGroupStatus(
    id: string,
    isActive: boolean,
    options: ExecutionOptions<Group> = {}
  ): Observable<Group> {
    return this.api.patch<Group>(`/api/groups/${id}/status`, { isActive }, {
      progressMessage: isActive ? 'Activating group...' : 'Deactivating group...',
      successMessage: `Group ${isActive ? 'activated' : 'deactivated'} successfully!`,
      showProgress: true,
      showSuccessAlert: true,
      showErrorAlert: true,
      logErrors: true,
      ...options
    });
  }

  /**
   * Get groups by instructor
   */
  public getGroupsByInstructor(
    instructorId: string,
    options: ExecutionOptions<GroupsResponse> = {}
  ): Observable<GroupsResponse> {
    return this.api.get<GroupsResponse>(`/api/instructors/${instructorId}/groups`, undefined, {
      progressMessage: 'Loading instructor groups...',
      showProgress: false,
      showSuccessAlert: false,
      showErrorAlert: true,
      logErrors: true,
      ...options
    });
  }

  /**
   * Assign students to group
   */
  public assignStudentsToGroup(
    groupId: string,
    studentIds: string[],
    options: ExecutionOptions<any> = {}
  ): Observable<any> {
    return this.api.post<any>(`/api/groups/${groupId}/students`, { studentIds }, {
      progressMessage: 'Assigning students to group...',
      successMessage: 'Students assigned successfully!',
      showProgress: true,
      showSuccessAlert: true,
      showErrorAlert: true,
      logErrors: true,
      ...options
    });
  }

  /**
   * Remove students from group
   */
  public removeStudentsFromGroup(
    groupId: string,
    studentIds: string[],
    options: ExecutionOptions<any> = {}
  ): Observable<any> {
    return this.api.delete<any>(`/api/groups/${groupId}/students`, {
      progressMessage: 'Removing students from group...',
      successMessage: 'Students removed successfully!',
      showProgress: true,
      showSuccessAlert: true,
      showErrorAlert: true,
      logErrors: true,
      ...options
    });
  }

  /**
   * Get group students
   */
  public getGroupStudents(
    groupId: string,
    options: ExecutionOptions<any> = {}
  ): Observable<any> {
    return this.api.get<any>(`/api/groups/${groupId}/students`, undefined, {
      progressMessage: 'Loading group students...',
      showProgress: false,
      showSuccessAlert: false,
      showErrorAlert: true,
      logErrors: true,
      ...options
    });
  }

  /**
   * Duplicate group
   */
  public duplicateGroup(
    id: string,
    newTitle: string,
    options: ExecutionOptions<Group> = {}
  ): Observable<Group> {
    return this.api.post<Group>(`/api/groups/${id}/duplicate`, { title: newTitle }, {
      progressMessage: 'Duplicating group...',
      successMessage: 'Group duplicated successfully!',
      showProgress: true,
      showSuccessAlert: true,
      showErrorAlert: true,
      logErrors: true,
      ...options
    });
  }

  /**
   * Export groups data
   */
  public exportGroups(format: 'csv' | 'excel' = 'csv', options: ExecutionOptions<Blob> = {}): Observable<Blob> {
    return this.api.get<Blob>(`/api/groups/export?format=${format}`, undefined, {
      progressMessage: 'Exporting groups data...',
      successMessage: 'Groups data exported successfully!',
      showProgress: true,
      showSuccessAlert: true,
      showErrorAlert: true,
      logErrors: true,
      ...options
    });
  }

  /**
   * Import groups data
   */
  public importGroups(file: File, options: ExecutionOptions<any> = {}): Observable<any> {
    return this.api.uploadFile('/api/groups/import', file, {
      progressMessage: 'Importing groups data...',
      successMessage: 'Groups data imported successfully!',
      fieldName: 'groupsFile',
      showProgress: true,
      showSuccessAlert: true,
      showErrorAlert: true,
      logErrors: true,
      trackProgress: true,
      ...options
    });
  }

  // ===== CONVENIENCE METHODS =====

  /**
   * Create CRUD operations helper for groups
   */
  public createGroupsCrud() {
    return this.api.createCrud<Group>('/api/groups');
  }

  /**
   * Search groups by title or description
   */
  public searchGroups(query: string, options: ExecutionOptions<GroupsResponse> = {}): Observable<GroupsResponse> {
    return this.api.get<GroupsResponse>('/api/groups/search', { q: query }, {
      progressMessage: 'Searching groups...',
      showProgress: false,
      showSuccessAlert: false,
      showErrorAlert: true,
      logErrors: true,
      ...options
    });
  }

  /**
   * Get groups statistics
   */
  public getGroupsStats(options: ExecutionOptions<any> = {}): Observable<any> {
    return this.api.get<any>('/api/groups/stats', undefined, {
      progressMessage: 'Loading groups statistics...',
      showProgress: false,
      showSuccessAlert: false,
      showErrorAlert: true,
      logErrors: true,
      ...options
    });
  }
}
