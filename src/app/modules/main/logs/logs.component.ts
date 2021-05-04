
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/common/swal.service';
import { MainService } from 'src/app/core/services/main.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { UserService } from 'src/app/core/services/user.service';
import { logsTab } from 'src/app/common/constants';
import * as moment from 'moment';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'app-logs',
	templateUrl: './logs.component.html',
	styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

	role;
	page = 1;
	skip = 0;
	totalRecords = 0;
	selected_limit = 10;
	default_pagination = {
		limit: 10,
		skip: 0
	}
	logsList = [];
	filters;
	// userRole;
	userLogsSelected = true;
	systemLogsSelected = false;
	errorLogsSelected = false;
	accessPermissions = {};
	searchQuery: any = { doerRole: '', operation: '', startDate: '', endDate: '' };
  	searchFilterClear:boolean = false;
	FilterDropdowns;
	maxDate;
	minDate;
	fromDate;
	fromDate1 = "";
	toDate;
	toDate1 = "";
	
	hoveredDate: NgbDate | null = null;

	default_sorting = {
		sortKey: 'createdAt',
		sortDirection: -1
	}
	active_class = "createdAt-1"
	// , calendar: NgbCalendar, public formatter: NgbDateParserFormatter
	constructor(private router: Router, private modalService: ModalService, private userService: UserService, private swalService: SwalService, private mainService: MainService) {
		// this.fromDate = calendar.getToday();
		// this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
	}

	ngOnInit(): void {
		var data;
		if (this.userLogsSelected) {
			data = { "type": '1', isError: false, ...this.default_pagination }
		}

		this.getLogs(this.default_pagination)
		this.getFilters({ "type": '1' });
		const current = new Date();
		this.fromDate = {};
		this.toDate = {};

		this.maxDate = {
			year: current.getFullYear(),
			month: current.getMonth() + 1,
			day: current.getDate()
		};
	}

	sorting(sortKey, sortDirection) {
		this.active_class = `${sortKey}${sortDirection}`;
		this.default_sorting = {
			sortKey,
			sortDirection
		}
		var query;
		query = {
			...this.default_pagination,
			...(this.userLogsSelected && {
				isError: false,
				type: '1'
			}),
			...(this.systemLogsSelected && {
				isError: false,
				type: '2'
			}),
			...(this.errorLogsSelected && {
				isError: true,
				type: '3'
			}),
			...this.default_sorting
		}
		this.getLogs(query)
	}

	getLogs(query) {
		this.userService.getLogs(query).subscribe((res) => {
			console.log("res", res)
			this.logsList = res.data.rows;
			this.totalRecords = res.data.count;
		})
	}

	getFilters(data) {
		this.userService.getLogsFilter(data).subscribe((res) => {
			console.log(res);
			this.FilterDropdowns = res.data;
		})
	}

	parseTimeString(timeString) {
		return moment(timeString).format('MMMM Do YYYY, h:mm a')
	}

	// dateChange(event) {
	//   console.log(event)
	//   this.minDate = event;
	//   this.date = `${event.month}/${event.day}/${event.year}`
	//   this.selectFilterValues('date', this.date)
	// }

	// on page change
	pageChanged(event) {
		this.page = event;
		this.skip = (this.page - 1) * this.selected_limit;
		this.default_pagination = {
			limit: this.selected_limit,
			skip: this.skip
		};
		let filter = (<any>Object).fromEntries(Object.entries(this.searchQuery).filter(([key, val]) => val !=""));
		var data;
		if (this.userLogsSelected) {
			data = { "type": '1', isError: false, ...this.default_pagination, ...(filter && Object.keys(filter).length > 0 ? filter : {}) }
		} else if (this.systemLogsSelected) {
			data = { "type": '2', isError: false, ...this.default_pagination, ...(filter && Object.keys(filter).length > 0 ? filter : {}) }
		} else if (this.errorLogsSelected) {
			data = { "type": '3', isError: true, ...this.default_pagination, ...(filter && Object.keys(filter).length > 0 ? filter : {}) }
		}
		this.getLogs(data);
	}

	//on limit change 
	onLimitChange(event) {
		this.selected_limit = event.target.value;
		this.skip = (this.page - 1) * this.selected_limit;
		this.default_pagination = {
			limit: this.selected_limit,
			skip: this.skip
		};
		let filter = (<any>Object).fromEntries(Object.entries(this.searchQuery).filter(([key, val]) => val !=""));
		var data;
		if (this.userLogsSelected) {
			data = { "type": '1', isError: false, ...this.default_pagination, ...(filter && Object.keys(filter).length > 0 ? filter : {}) }
		} else if (this.systemLogsSelected) {
			data = { "type": '2', isError: false, ...this.default_pagination, ...(filter && Object.keys(filter).length > 0 ? filter : {}) }
		} else if (this.errorLogsSelected) {
			data = { "type": '3', isError: true, ...this.default_pagination, ...(filter && Object.keys(filter).length > 0 ? filter : {}) }
		}
		this.getLogs(data);
	}

	filter() {
		let x = document.getElementById("search_filter");
		if (x.style.display === "none") {
			x.style.display = "block";
		} else {
			x.style.display = "none";
		}
	}

	selectFilterValues(key, event) {
		console.log(this.fromDate)
		if (key == "startDate" || key == "endDate") {
			this.searchQuery[key] = event
		}
		// else if (event.target.value !== '') {
		// 	this.searchQuery[key] = event.target.value;
		// } else {
		// 	delete this.searchQuery[key];
		// }
	}
	//apply search filter
	async applySearch() {
		console.log("date in apply", this.fromDate)
		if (this.fromDate && Object.keys(this.fromDate).length > 0) {
			this.fromDate1 = `${this.fromDate?.month}/${this.fromDate?.day}/${this.fromDate?.year}`
			this.selectFilterValues('startDate', this.fromDate1)
		}
		if (this.toDate && Object.keys(this.toDate).length > 0) {
			this.toDate1 = `${this.toDate?.month}/${this.toDate?.day}/${this.toDate?.year}`
			this.selectFilterValues('endDate', this.toDate1)
		}
		let filter = (<any>Object).fromEntries(Object.entries(this.searchQuery).filter(([key, val]) => val !=""));
		var data;
		// await this.getUserList(thisariaSelectedForGeneralInfo.default_pagination);
		if (this.userLogsSelected) {
			data = { "type": '1', isError: false, ...this.default_pagination, ...(this.filter && Object.keys(filter).length > 0 ? filter : {}) }
		} else if (this.systemLogsSelected) {
			data = { "type": '2', isError: false, ...this.default_pagination, ...(filter && Object.keys(filter).length > 0 ? filter : {}) }
		} else if (this.errorLogsSelected) {
			data = { "type": '3', isError: true, ...this.default_pagination, ...(filter && Object.keys(filter).length > 0 ? filter : {}) }
		}
		this.getLogs(data)
		let x = document.getElementById("search_filter");
		x.style.display = "none";
	}

	cancelSearch() {
		let x = document.getElementById("search_filter");
		x.style.display = "none";
		if(this.searchFilterClear){
			this.searchFilterClear = false;
			this.applySearch();
		}
	}

	tabChanged(data?) {
		let x = document.getElementById("search_filter");
		if (x.style.display === "block") {
			x.style.display = "none";
		}
		this.fromDate = {};
		this.fromDate1 = ""
		this.toDate = {};
		this.toDate1 = ""
		this.searchQuery = { doerRole: '', operation: '', startDate: '', endDate: '' }
		this.page = 1;
		this.default_sorting = {
			sortKey: 'createdAt',
			sortDirection: -1
		}
		this.default_pagination = {
			limit: this.selected_limit,
			skip: 0
		}
		if (data == 'userLogs') {
			this.userLogsSelected = true;
			this.systemLogsSelected = false;
			this.errorLogsSelected = false;
			let query = {
				"type": '1',
				isError: false,
				...this.default_sorting,
				...this.default_pagination
			}
			this.getLogs(query);
			this.getFilters({ "type": '1' });
		} else if (data == 'systemLogs') {
			this.userLogsSelected = false;
			this.systemLogsSelected = true;
			this.errorLogsSelected = false;
			let query = {
				"type": '2',
				isError: false,
				...this.default_pagination,
				...this.default_sorting
			}
			this.getLogs(query);
			this.getFilters({ "type": '2' });
		} else if (data == 'errorLogs') {
			this.userLogsSelected = false;
			this.systemLogsSelected = false;
			this.errorLogsSelected = true;
			let query = {
				"type": '3',
				isError: true,
				...this.default_pagination,
				...this.default_sorting
			}
			this.getLogs(query);
			this.getFilters({ type: '3' });
		}
	}
	clearFilters() {
		this.fromDate = undefined;
		this.toDate = undefined;
		this.searchQuery = { doerRole: '', operation: '', startDate: '', endDate: '' };
		this.searchFilterClear = true;
	}
}


