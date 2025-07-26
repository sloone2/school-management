import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IGroup } from 'src/app/models/model';
import { PaginationService, pageSelection, tablePageSize } from 'src/app/shared/service/custom-pagination/pagination.service';
import { GroupsService, Group, CreateGroupRequest, UpdateGroupRequest } from './groups.service';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrl: './manage-groups.component.scss',
  standalone: false
})
export class ManageGroupsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // ViewChild references for modals (Angular way)
  @ViewChild('addGroupModal') addGroupModal!: ElementRef;
  @ViewChild('editGroupModal') editGroupModal!: ElementRef;
  @ViewChild('viewGroupModal') viewGroupModal!: ElementRef;

  public routes = routes;
  public Math = Math;

  // Loading states
  public isLoading = false;
  public isCreating = false;
  public isUpdating = false;
  public isDeleting = false;

  // Pagination variables
  public pageSize = 10;
  public tableData: IGroup[] = [];
  public tableDataCopy: IGroup[] = [];
  public actualData: IGroup[] = [];
  public currentPage = 1;
  public skip = 0;
  public limit: number = this.pageSize;
  public serialNumberArray: number[] = [];
  public totalData = 0;
  public pageSelection: pageSelection[] = [];
  dataSource!: MatTableDataSource<IGroup>;
  public searchDataValue = '';

  // Form data
  public selectedGroup: IGroup | null = null;
  public groupForm = {
    title: '',
    description: '',
    isActive: true,
    studentsCount : 0
  };

  // Form validation
  public formErrors = {
    title: '',
    description: ''
  };

  // Modal visibility states (Angular way)
  public showAddModal = false;
  public showEditModal = false;
  public showViewModal = false;

  constructor(
    private groupsService: GroupsService,
    private router: Router,
    private pagination: PaginationService
  ) {}

  ngOnInit(): void {
    this.loadGroups();
    this.setupPagination();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadGroups(): void {
    this.isLoading = true;

    this.groupsService.getGroups({
      progressMessage: 'Loading groups...',
      showProgress: false,
      showSuccessAlert: false,
      showErrorAlert: true,
      logErrors: true
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.actualData = response.data || response;
        this.setupTableData();
      },
      error: (error) => {
        this.isLoading = false;
        // ApiService already handled the error display
        this.actualData = [];
        this.setupTableData();
      }
    });
  }

  private setupPagination(): void {
    this.pagination.tablePageSize.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: tablePageSize) => {
      if (this.router.url == this.routes.instructorManageGroups) {
        this.getTableData({ skip: res.skip, limit: res.limit });
        this.pageSize = res.pageSize;
      }
    });
  }

  private setupTableData(): void {
    this.getTableData({ skip: 0, limit: this.pageSize });
  }

  private getTableData(pageOption: pageSelection): void {
    this.tableData = [];
    this.tableDataCopy = [];
    this.serialNumberArray = [];
    this.totalData = this.actualData.length;

    this.actualData.map((res: IGroup, index: number) => {
      const serialNumber = index + 1;
      if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
        res.sNo = serialNumber;
        this.tableData.push(res);
        this.tableDataCopy.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });

    this.dataSource = new MatTableDataSource<IGroup>(this.actualData);
    this.pagination.calculatePageSize.next({
      totalData: this.totalData,
      pageSize: this.pageSize,
      tableData: this.tableData,
      tableDataCopy: this.tableDataCopy,
      serialNumberArray: this.serialNumberArray,
    });
  }

  public searchData(value: string): void {
    this.searchDataValue = value;
    if (value == '') {
      this.tableData = this.tableDataCopy;
    } else {
      this.dataSource.filter = value.trim().toLowerCase();
      this.tableData = this.dataSource.filteredData;
    }
  }

  public sortData(sort: Sort) {
    const data = this.tableData.slice();

    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      this.tableData = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public changePageSize(pageSize: number): void {
    this.pageSelection = [];
    this.limit = pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.pagination.tablePageSize.next({
      skip: this.skip,
      limit: this.limit,
      pageSize: this.pageSize,
    });
  }

  // ===== MODAL MANAGEMENT (Angular Way) =====

  public openAddModal(): void {
    this.resetForm();
    this.showAddModal = true;
  }

  public openEditModal(group: IGroup): void {
    this.editGroup(group);
    this.showEditModal = true;
  }

  public openViewModal(group: IGroup): void {
    this.viewGroup(group);
    this.showViewModal = true;
  }

  public closeAddModal(): void {
    this.showAddModal = false;
    this.resetForm();
  }

  public closeEditModal(): void {
    this.showEditModal = false;
    this.resetForm();
  }

  public closeViewModal(): void {
    this.showViewModal = false;
    this.selectedGroup = null;
  }

  // ===== CRUD OPERATIONS =====

  public createGroup(): void {
    if (!this.validateGroupForm()) {
      return;
    }

    this.isCreating = true;

    const groupData: CreateGroupRequest = {
      title: this.groupForm.title.trim(),
      description: this.groupForm.description.trim(),
      isActive: this.groupForm.isActive
    };

    this.groupsService.createGroupWithConfirmation(groupData, {
      progressMessage: 'Creating group...',
      successMessage: 'Group created successfully!',
      showProgress: true,
      showSuccessAlert: true,
      showErrorAlert: true,
      logErrors: true
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (result) => {
        this.isCreating = false;

        if (result && typeof result === 'object' && !('cancelled' in result)) {
          // Success - ApiService already showed success message
          this.loadGroups(); // Refresh the list
          this.closeAddModal(); // Close modal the Angular way
        }
      },
      error: (error) => {
        this.isCreating = false;
        // ApiService already handled the error display
      }
    });
  }

  public updateGroup(): void {
    if (!this.selectedGroup || !this.validateGroupForm()) {
      return;
    }

    this.isUpdating = true;

    const groupData: UpdateGroupRequest = {
      title: this.groupForm.title.trim(),
      description: this.groupForm.description.trim(),
      isActive: this.groupForm.isActive
    };

    this.groupsService.updateGroupWithConfirmation(
      this.selectedGroup.id!,
      groupData,
      {
        progressMessage: 'Updating group...',
        successMessage: 'Group updated successfully!',
        showProgress: true,
        showSuccessAlert: true,
        showErrorAlert: true,
        logErrors: true
      }
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (result) => {
        this.isUpdating = false;

        if (result && typeof result === 'object' && !('cancelled' in result)) {
          // Success - ApiService already showed success message
          this.loadGroups(); // Refresh the list
          this.closeEditModal(); // Close modal the Angular way
        }
      },
      error: (error) => {
        this.isUpdating = false;
        // ApiService already handled the error display
      }
    });
  }

  public deleteGroup(group: IGroup): void {


    this.isDeleting = true;

    this.groupsService.deleteGroupWithConfirmation(
      '1',
      group.title,
      {
        progressMessage: 'Deleting group...',
        successMessage: 'Group deleted successfully!',
        showProgress: true,
        showSuccessAlert: true,
        showErrorAlert: true,
        logErrors: true
      }
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (result) => {
        this.isDeleting = false;

        if (result && typeof result === 'object' && !('cancelled' in result)) {
          // Success - ApiService already showed success message
          this.loadGroups(); // Refresh the list
        }
      },
      error: (error) => {
        this.isDeleting = false;
        // ApiService already handled the error display
      }
    });
  }

  public editGroup(group: IGroup): void {
    this.selectedGroup = group;
    this.groupForm = {
      studentsCount: group.studentsCount,
      title: group.title,
      description: group.description,
      isActive: group.isActive !== undefined ? group.isActive : true
    };
    this.clearFormErrors();
  }

  public viewGroup(group: IGroup): void {
    this.selectedGroup = group;
  }

  public toggleGroupStatus(group: IGroup): void {
    if (!group.id) {
      // Show a simple warning for invalid ID

      return;
    }

    const newStatus = !group.isActive;

    this.groupsService.toggleGroupStatus(group.id, newStatus, {
      progressMessage: newStatus ? 'Activating group...' : 'Deactivating group...',
      successMessage: `Group ${newStatus ? 'activated' : 'deactivated'} successfully!`,
      showProgress: true,
      showSuccessAlert: true,
      showErrorAlert: true,
      logErrors: true
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (updatedGroup) => {
        // Update the group in the local data
        const index = this.actualData.findIndex(g => g.id === group.id);
        if (index !== -1) {
          this.actualData[index].isActive = newStatus;
          this.setupTableData(); // Refresh the table
        }
      },
      error: (error) => {
        // ApiService already handled the error display
      }
    });
  }

  public duplicateGroup(group: IGroup): void {
    if (!group.id) {
      // Show a simple warning for invalid ID

      return;
    }

    const newTitle = `${group.title} (Copy)`;

    this.groupsService.duplicateGroup(group.id, newTitle, {
      progressMessage: 'Duplicating group...',
      successMessage: 'Group duplicated successfully!',
      showProgress: true,
      showSuccessAlert: true,
      showErrorAlert: true,
      logErrors: true
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (duplicatedGroup) => {
        this.loadGroups(); // Refresh the list
      },
      error: (error) => {
        // ApiService already handled the error display
      }
    });
  }

  // ===== FORM VALIDATION =====

  private validateGroupForm(): boolean {
    this.clearFormErrors();
    let isValid = true;

    if (!this.groupForm.title.trim()) {
      this.formErrors.title = 'Group title is required';
      isValid = false;
    } else if (this.groupForm.title.trim().length < 3) {
      this.formErrors.title = 'Group title must be at least 3 characters';
      isValid = false;
    }

    if (!this.groupForm.description.trim()) {
      this.formErrors.description = 'Group description is required';
      isValid = false;
    } else if (this.groupForm.description.trim().length < 10) {
      this.formErrors.description = 'Group description must be at least 10 characters';
      isValid = false;
    }



    return isValid;
  }

  private clearFormErrors(): void {
    this.formErrors = {
      title: '',
      description: ''
    };
  }

  public isFieldInvalid(fieldName: string): boolean {
    return !!(this.formErrors as any)[fieldName];
  }

  public getFieldError(fieldName: string): string {
    return (this.formErrors as any)[fieldName] || '';
  }

  // ===== UTILITY METHODS =====

  public resetForm(): void {
    this.selectedGroup = null;
    this.groupForm = {
      studentsCount: 0,
      title: '',
      description: '',
      isActive: true
    };
    this.clearFormErrors();
  }

  public onFormSubmit(isEdit: boolean = false): void {
    if (isEdit) {
      this.updateGroup();
    } else {
      this.createGroup();
    }
  }

  // ===== GETTERS FOR TEMPLATE =====

  get canSubmit(): boolean {
    return !this.isCreating && !this.isUpdating;
  }

  get submitButtonText(): string {
    if (this.isCreating) return 'Creating...';
    if (this.isUpdating) return 'Updating...';
    return this.selectedGroup ? 'Update Group' : 'Create Group';
  }

  get hasData(): boolean {
    return this.actualData.length > 0;
  }

  get isLoadingData(): boolean {
    return this.isLoading;
  }

  // ===== EVENT HANDLERS =====

  public onSearchChange(value: string): void {
    this.searchData(value);
  }

  public onRefresh(): void {
    this.loadGroups();
  }

  public onExportGroups(): void {
    this.groupsService.exportGroups('csv', {
      progressMessage: 'Exporting groups...',
      successMessage: 'Groups exported successfully!',
      showProgress: true,
      showSuccessAlert: true,
      showErrorAlert: true,
      logErrors: true
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (blob) => {
        // Handle file download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `groups_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        // ApiService already handled the error display
      }
    });
  }

  // ===== MODAL TRANSITION METHODS =====

  public editFromView(): void {
    if (this.selectedGroup) {
      this.closeViewModal();
      this.openEditModal(this.selectedGroup);
    }
  }
}
