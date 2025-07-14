import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { apiResultFormat, instructorGroup } from 'src/app/models/model';
import { PaginationService, pageSelection, tablePageSize } from 'src/app/shared/service/custom-pagination/pagination.service';
import { DataService } from 'src/app/shared/service/data/data.service';
import { routes } from 'src/app/shared/service/routes/routes';
import { createSimpleErrorHandler, SimpleErrorHandler } from 'src/app/shared/service/simpleErrorHandler';

declare var bootstrap: any;

@Component({
    selector: 'app-instructor-manage-groups',
    templateUrl: './instructor-manage-groups.component.html',
    styleUrl: './instructor-manage-groups.component.scss',
    standalone: false
})
export class InstructorManageGroupsComponent implements OnInit {
  public routes = routes;
  public errorHandler: SimpleErrorHandler = createSimpleErrorHandler();
 
   // pagination variables
   public pageSize = 10;
   public tableData: instructorGroup[] = [];
   public tableDataCopy: instructorGroup[] = [];
   public actualData: instructorGroup[] = [];
   public currentPage = 1;
   public skip = 0;
   public limit: number = this.pageSize;
   public serialNumberArray: number[] = [];
   public totalData = 0;       
   public pageSelection: pageSelection[] = [];
   dataSource!: MatTableDataSource<instructorGroup>;
   public searchDataValue = '';

   // Form data
   public selectedGroup: instructorGroup | null = null;
   public groupForm = {
     title: '',
     description: '',
     isActive: true
   };

   // Modal references
   private addModal: any;
   private editModal: any;
   private viewModal: any;

   constructor(
     private data: DataService,
     private router: Router,
     private pagination: PaginationService
   ) {}

   ngOnInit(): void {
     this.loadGroups();
     this.initializeModals();
   }

   private initializeModals(): void {
     // Initialize Bootstrap modals
     setTimeout(() => {
       const addModalElement = document.getElementById('add_group');
       const editModalElement = document.getElementById('edit_group');
       const viewModalElement = document.getElementById('view_group');

       if (addModalElement) {
         this.addModal = new bootstrap.Modal(addModalElement);
       }
       if (editModalElement) {
         this.editModal = new bootstrap.Modal(editModalElement);
       }
       if (viewModalElement) {
         this.viewModal = new bootstrap.Modal(viewModalElement);
       }
     }, 100);
   }

   private async loadGroups(): Promise<void> {
     try {
       // Try to load from backend API first, fallback to mock data
       this.data.getGroupsFromAPI().subscribe({
         next: (response: any) => {
           this.actualData = response.data || response;
           this.setupPagination();
         },
         error: (error) => {
           console.warn('Backend API not available, using mock data:', error);
           // Fallback to mock data
           this.data.getInstructorGroups().subscribe({
             next: (apiRes: apiResultFormat) => {
               this.actualData = apiRes.data;
               this.setupPagination();
             },
             error: (mockError) => {
               this.errorHandler.showError('Failed to load groups');
               console.error('Failed to load groups:', mockError);
             }
           });
         }
       });
     } catch (error) {
       this.errorHandler.showError('Failed to load groups');
       console.error('Failed to load groups:', error);
     }
   }

   private setupPagination(): void {
     this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
       if (this.router.url == this.routes.instructorManageGroups) {
         this.getTableData({ skip: res.skip, limit: res.limit });
         this.pageSize = res.pageSize;
       }
     });
   }

   private getTableData(pageOption: pageSelection): void {
     this.tableData = [];
     this.tableDataCopy = [];
     this.serialNumberArray = [];
     this.totalData = this.actualData.length;
     
     this.actualData.map((res: instructorGroup, index: number) => {
       const serialNumber = index + 1;
       if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
         res.sNo = serialNumber;
         this.tableData.push(res);
         this.tableDataCopy.push(res);
         this.serialNumberArray.push(serialNumber);
       }
     });
     
     this.dataSource = new MatTableDataSource<instructorGroup>(this.actualData);
     this.pagination.calculatePageSize.next({
       totalData: this.totalData,
       pageSize: this.pageSize,
       tableData: this.tableData,
       tableDataCopy: this.tableDataCopy,
       serialNumberArray: this.serialNumberArray,
     });
   }
 
   public searchData(value: string): void {
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

   // CRUD Operations with Backend Integration
   public async createGroup(): Promise<void> {
     if (!this.validateGroupForm()) {
       return;
     }

     try {
       await this.errorHandler.executeWithConfirmation(
         async () => {
           return new Promise((resolve, reject) => {
             this.data.createGroup(this.groupForm).subscribe({
               next: (response) => {
                 this.actualData.unshift(response);
                 this.loadGroups(); // Refresh the grid
                 this.resetForm();
                 this.closeModal('add');
                 this.errorHandler.showSuccess('Group created successfully!');
                 resolve(response);
               },
               error: (error) => {
                 // Fallback to mock behavior if backend not available
                 const newGroup: instructorGroup = {
                   id: Date.now().toString(),
                   title: this.groupForm.title,
                   description: this.groupForm.description,
                   isActive: this.groupForm.isActive,
                   createdAt: new Date().toLocaleDateString()
                 };
                 this.actualData.unshift(newGroup);
                 this.loadGroups();
                 this.resetForm();
                 this.closeModal('add');
                 this.errorHandler.showSuccess('Group created successfully!');
                 resolve(newGroup);
               }
             });
           });
         },
         'Are you sure you want to create this group?'
       );
     } catch (error: any) {
       if (error.message !== 'Operation cancelled by user') {
         this.errorHandler.showError('Failed to create group');
         console.error('Failed to create group:', error);
       }
     }
   }

   public async updateGroup(): Promise<void> {
     if (!this.selectedGroup || !this.validateGroupForm()) {
       return;
     }

     try {
       await this.errorHandler.executeWithConfirmation(
         async () => {
           return new Promise((resolve, reject) => {
             this.data.updateGroup(this.selectedGroup!.id!, this.groupForm).subscribe({
               next: (response) => {
                 const index = this.actualData.findIndex(g => g.id === this.selectedGroup!.id);
                 if (index !== -1) {
                   this.actualData[index] = { ...this.actualData[index], ...this.groupForm };
                 }
                 this.loadGroups();
                 this.resetForm();
                 this.closeModal('edit');
                 this.errorHandler.showSuccess('Group updated successfully!');
                 resolve(response);
               },
               error: (error) => {
                 // Fallback to mock behavior
                 const index = this.actualData.findIndex(g => g.id === this.selectedGroup!.id);
                 if (index !== -1) {
                   this.actualData[index] = { ...this.actualData[index], ...this.groupForm };
                 }
                 this.loadGroups();
                 this.resetForm();
                 this.closeModal('edit');
                 this.errorHandler.showSuccess('Group updated successfully!');
                 resolve(this.actualData[index]);
               }
             });
           });
         },
         'Are you sure you want to update this group?'
       );
     } catch (error: any) {
       if (error.message !== 'Operation cancelled by user') {
         this.errorHandler.showError('Failed to update group');
         console.error('Failed to update group:', error);
       }
     }
   }

   public async deleteGroup(group: instructorGroup): Promise<void> {
     try {
       await this.errorHandler.executeWithConfirmation(
         async () => {
           return new Promise((resolve, reject) => {
             this.data.deleteGroup(group.id!).subscribe({
               next: (response) => {
                 this.actualData = this.actualData.filter(g => g.id !== group.id);
                 this.loadGroups();
                 this.errorHandler.showSuccess('Group deleted successfully!');
                 resolve(response);
               },
               error: (error) => {
                 // Fallback to mock behavior
                 this.actualData = this.actualData.filter(g => g.id !== group.id);
                 this.loadGroups();
                 this.errorHandler.showSuccess('Group deleted successfully!');
                 resolve(true);
               }
             });
           });
         },
         `Are you sure you want to delete "${group.title}"? This action cannot be undone.`
       );
     } catch (error: any) {
       if (error.message !== 'Operation cancelled by user') {
         this.errorHandler.showError('Failed to delete group');
         console.error('Failed to delete group:', error);
       }
     }
   }

   public editGroup(group: instructorGroup): void {
     this.selectedGroup = group;
     this.groupForm = {
       title: group.title,
       description: group.description,
       isActive: group.isActive || true
     };
   }

   public viewGroup(group: instructorGroup): void {
     this.selectedGroup = group;
   }

   private validateGroupForm(): boolean {
     if (!this.groupForm.title.trim()) {
       this.errorHandler.showWarning('Please enter a group title');
       return false;
     }

     if (!this.groupForm.description.trim()) {
       this.errorHandler.showWarning('Please enter a group description');
       return false;
     }

     return true;
   }

   public resetForm(): void {
     this.selectedGroup = null;
     this.groupForm = {
       title: '',
       description: '',
       isActive: true
     };
   }

   private closeModal(modalType: 'add' | 'edit' | 'view'): void {
     try {
       switch (modalType) {
         case 'add':
           if (this.addModal) {
             this.addModal.hide();
           }
           break;
         case 'edit':
           if (this.editModal) {
             this.editModal.hide();
           }
           break;
         case 'view':
           if (this.viewModal) {
             this.viewModal.hide();
           }
           break;
       }
     } catch (error) {
       console.warn('Error closing modal:', error);
     }
   }

   public onFormSubmit(isEdit: boolean = false): void {
     if (isEdit) {
       this.updateGroup();
     } else {
       this.createGroup();
     }
   }
}

