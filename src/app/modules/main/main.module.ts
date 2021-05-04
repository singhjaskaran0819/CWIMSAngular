import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { SharedModule } from '../shared/shared.module';
import { loggedInGuard } from '../../core/guards/auth-guard';
import { WarehouseLocationsComponent } from './warehouse-locations/warehouse-locations.component';
import { MainComponent } from './main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { DeclarationsComponent } from './declarations/declarations.component';
import { GoodsReceivedComponent } from './declarations/goods-received/goods-received.component';
import { GoodsDetailsComponent } from './declarations/goods-details/goods-details.component';
import { PaginationComponent } from 'src/app/common/pagination/pagination.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SalesComponent } from './sales/sales/sales.component';
import { SalesListComponent } from './sales/sales-list/sales-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { ChartsModule } from 'ng2-charts';
import { InventoryComponent } from './inventory/inventory.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { StandardReportsComponent } from './standard-reports/standard-reports.component';
import { RiskManagementComponent } from './risk-management/risk-management.component';
import { RiskCriteriaComponent } from './risk-management/risk-criteria/risk-criteria.component';
import { TargetListComponent } from './risk-management/target-list/target-list.component';
import { RiskReportComponent } from './risk-management/risk-report/risk-report.component';
import { ListOfCriteriaComponent } from './risk-management/risk-criteria/list-of-criteria/list-of-criteria.component';
import { ListOfFindingsComponent } from './risk-management/risk-report/list-of-findings/list-of-findings.component';
import { ListOfTargetComponent } from './risk-management/target-list/list-of-target/list-of-target.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ModalService } from 'src/app/core/services/modal.service';
import { InventoryDetailsComponent } from './inventory/inventory-details/inventory-details.component';
import { StockTakeComponent } from './inventory/stock-take/stock-take.component';
import { CreateSalesComponent } from './sales/create-sales/create-sales.component';
import { ReceiptComponent } from './sales/receipt/receipt.component';
import { StandardReportsOperatorComponent } from './standard-reports/standard-reports-operator/standard-reports-operator.component';
import { StandardReportsOfficerComponent } from './standard-reports/standard-reports-officer/standard-reports-officer.component';
import { SalesListOperatorComponent } from './sales/sales-list/sales-list-operator/sales-list-operator.component';
import { SalesListOfficerComponent } from './sales/sales-list/sales-list-officer/sales-list-officer.component';
import { ReturnItemComponent } from './sales/return-item/return-item.component';
import { InitiateDeclarationComponent } from './sales/initiate-declaration/initiate-declaration.component';
import { RejectComponent } from './declarations/reject/reject.component';
import { ReplyComponent } from './declarations/reply/reply.component';
import { VarianceReportComponent } from './inventory/variance-report/variance-report.component';
import { UserListComponent } from './user-management/user-list/user-list.component';
import { UserDetailComponent } from './user-management/user-detail/user-detail.component';
import { MyProfileComponent } from './user-management/my-profile/my-profile.component';
import { EditUserComponent } from './user-management/edit-user/edit-user.component';
import { BlockUserComponent } from './user-management/block-user/block-user.component';
import { GroupItemsComponent } from './inventory/group-items/group-items.component';
import { GroupedItemsListComponent } from './inventory/grouped-items-list/grouped-items-list.component';
import { UserRolePipe } from 'src/app/core/pipes/user-role.pipe';
import { ApprovalStatusPipe } from 'src/app/core/pipes/approval-status.pipe';
import { DatePipe } from 'src/app/core/pipes/date.pipe';
import { UserPositionPipe } from 'src/app/core/pipes/user-position.pipe';
import { AccessPermissionComponent } from './user-management/access-permission/access-permission.component';
import { ApproveUserComponent } from './user-management/approve-user/approve-user.component';
import { RejectUserComponent } from './user-management/reject-user/reject-user.component';
import { CreateNewRoleComponent } from './user-management/create-new-role/create-new-role.component';
import { AddNewUserComponent } from './user-management/add-new-user/add-new-user.component';
import { ReassignPermissionsComponent } from './user-management/reassign-permissions/reassign-permissions.component';
import { ManageRolesComponent } from './user-management/manage-roles/manage-roles.component';
import { ViewRolePermissionsComponent } from './user-management/view-role-permissions/view-role-permissions.component';
import { RackItemsComponent } from './declarations/rack-items/rack-items.component';
import { UploadItemsComponent } from './declarations/upload-items/upload-items.component';
import { ComingSoonComponent } from 'src/app/common/coming-soon/coming-soon.component';
import { UploadSaleComponent } from './sales/upload-sale/upload-sale.component';
import { LogsComponent } from './logs/logs.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../../../environments/environment';
import { EditStockTakeComponent } from './inventory/edit-stock-take/edit-stock-take.component';
import { StockTakeListComponent } from './inventory/stock-take-list/stock-take-list.component';
import { ErrorLogsComponent } from './error-logs/error-logs.component';

const config: SocketIoConfig = { url: environment.apiUrl, options: {} };

const route: Routes = [
  {
    path: '', canActivate: [loggedInGuard], component: MainComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'warehouse', component: WarehouseLocationsComponent },
      {
        path: 'declarations', component: DeclarationsComponent
        // children: [
        //   { path: 'goods', component: GoodsReceivedComponent },
        //   { path: 'goods-details', component: GoodsDetailsComponent }
        // ]
      },
      // { path: 'goods-details', component: GoodsDetailsComponent },
      {
        path: 'sale',
        children: [
          { path: 'sales', component: ComingSoonComponent },
          // { path: 'create', component: CreateSalesComponent },
          // { path: 'list', component: SalesListComponent }
          { path: 'create', component: ComingSoonComponent },
          { path: 'list', component: ComingSoonComponent }
        ]
      },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'inventory',
        children: [
          { path: 'list', component: InventoryComponent },
          { path: 'variance-report', component: VarianceReportComponent },
          { path: 'stock-take', component: StockTakeComponent },
          { path: 'stock-take/edit/:serial', component: StockTakeComponent },
          { path: 'stock-take-list', component: StockTakeListComponent },
          { path: 'grouped-items', component: GroupedItemsListComponent }
        ]
      },
      { path: 'appointments', component: ComingSoonComponent },
      { path: 'analytics', component: ComingSoonComponent },
      { path: 'reports', component: ComingSoonComponent },
      { path: 'logs', component: LogsComponent },
      { path: 'error-logs', component: ErrorLogsComponent },
      {
        path: 'risk-management',
        children: [
          {
            path: 'risk-criteria',
            children: [
              { path: 'criteria', component: ComingSoonComponent },
              { path: 'list-of-criteria', component: ComingSoonComponent }
            ]
          },
          {
            path: 'target',
            children: [
              { path: 'target-list', component: ComingSoonComponent },
              { path: 'list-of-target', component: ComingSoonComponent }
            ]
          },
          {
            path: 'report',
            children: [
              { path: 'risk-report', component: ComingSoonComponent },
              { path: 'list-of-findings', component: ComingSoonComponent }
            ]
          }
        ]
      },
      {
        path: 'user',
        children: [
          { path: 'list', component: UserListComponent },
          // { path: 'list/:id', component: UserDetailComponent }  ManageRolesComponent
          { path: 'roles', component: ManageRolesComponent }
        ]
      },
      {
        path: 'my-profile',
        component: MyProfileComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    WarehouseLocationsComponent,
    DashboardComponent,
    ErrorLogsComponent,
    AnalyticsComponent,
    DeclarationsComponent,
    GoodsReceivedComponent,
    MainComponent,
    GoodsDetailsComponent,
    PaginationComponent,
    SalesComponent,
    SalesListComponent,
    InventoryComponent,
    AppointmentsComponent,
    StandardReportsComponent,
    RiskManagementComponent,
    RiskCriteriaComponent,
    TargetListComponent,
    RiskReportComponent,
    ListOfCriteriaComponent,
    ListOfFindingsComponent,
    ListOfTargetComponent,
    InventoryDetailsComponent,
    StockTakeComponent,
    CreateSalesComponent,
    ReceiptComponent,
    StandardReportsOperatorComponent,
    StandardReportsOfficerComponent,
    SalesListOperatorComponent,
    SalesListOfficerComponent,
    ReturnItemComponent,
    InitiateDeclarationComponent,
    RejectComponent,
    ReplyComponent,
    VarianceReportComponent,
    UserListComponent,
    UserDetailComponent,
    MyProfileComponent,
    EditUserComponent,
    BlockUserComponent,
    GroupItemsComponent,
    GroupedItemsListComponent,
    UserRolePipe,
    ApprovalStatusPipe,
    DatePipe,
    UserPositionPipe,
    AccessPermissionComponent,
    ApproveUserComponent,
    RejectUserComponent,
    CreateNewRoleComponent,
    AddNewUserComponent,
    ReassignPermissionsComponent,
    ManageRolesComponent,
    ViewRolePermissionsComponent,
    RackItemsComponent,
    UploadItemsComponent,
    UploadSaleComponent,
    LogsComponent,
    EditStockTakeComponent,
    StockTakeListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModule,
    NgxIntlTelInputModule,
    RouterModule.forChild(route),
    InfiniteScrollModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxFileDropModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    loggedInGuard,
    ModalService
  ],
  exports: [
    UserRolePipe,
    ApprovalStatusPipe,
    UserPositionPipe
  ]
})
export class MainModule { }
