import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/core/services/user.service';
import * as moment from 'moment';

@Component({
	selector: 'app-error-logs',
	templateUrl: './error-logs.component.html',
	styleUrls: ['./error-logs.component.scss']
})
export class ErrorLogsComponent implements OnInit {

	errorLogs;
	totalRecords = 0;

	// pagination
	selected_limit = 10;
	default_pagination = {
		limit: 10,
		skip: 0
	};
	default_sorting = {
		sortKey: 'createdAt',
		sortDirection: -1
	};

	page = 1;

	active_class = 'createdAt-1'

	filters;
	fromDate;
	toDate;
	selected_operation = "";

	constructor(
		private userService: UserService
	) { }

	ngOnInit(): void {
		this.getErrorLogs({
			...this.default_pagination,
			...this.default_sorting
		})
		this.getFilters({ type: "3", errorLogsOnly: true })
	}

	getErrorLogs(data) {
		this.userService.getErrorLogs(data).subscribe(res => {
			this.errorLogs = res.data.rows;
			this.totalRecords = res.data.count;
		})
	}

	getFilters(data) {
		this.userService.getLogsFilter(data).subscribe((res) => {
			this.filters = res.data;
		})
	}

	clearFilters() {
		this.selected_operation = "";
		this.fromDate = null;
		this.toDate = null;
	}

	sorting(sortKey, sortDirection) {
		this.active_class = `${sortKey}${sortDirection}`;
		this.default_sorting = {
			sortKey,
			sortDirection
		}
		this.getErrorLogs({
			...this.default_pagination,
			...this.default_sorting
		})
	}

	filter() {
		let x = document.getElementById("search_filter");
		if (x.style.display === "none") {
			x.style.display = "block";
		} else {
			x.style.display = "none";
		}
	}


	applySearch() {
		this.getErrorLogs({
			...this.default_pagination,
			...this.default_sorting,
			...(this.selected_operation && this.selected_operation != "" && { operation: this.selected_operation }),
			...(this.fromDate && { startDate: `${this.fromDate?.month}/${this.fromDate?.day}/${this.fromDate?.year}` }),
			...(this.toDate && { endDate: `${this.toDate?.month}/${this.toDate?.day}/${this.toDate?.year}` })
		})
		let x = document.getElementById("search_filter");
		x.style.display = "none";
	}

	cancelSearch() {
		this.getErrorLogs({
			...this.default_pagination,
			...this.default_sorting,
			...(this.selected_operation && this.selected_operation != "" && { operation: this.selected_operation }),
			...(this.fromDate && { startDate: `${this.fromDate?.month}/${this.fromDate?.day}/${this.fromDate?.year}` }),
			...(this.toDate && { endDate: `${this.toDate?.month}/${this.toDate?.day}/${this.toDate?.year}` })
		})
		let x = document.getElementById("search_filter");
		x.style.display = "none";
	}

	parseTimeString(timeString) {
		return moment(timeString).format('MMMM Do YYYY, h:mm a')
	}

	pageChanged(event) {
		this.page = event;
		this.default_pagination = {
			limit: this.selected_limit,
			skip: (this.page - 1) * this.selected_limit
		};
		// let filter = (<any>Object).fromEntries(Object.entries(this.searchQuery).filter(([key, val]) => val != ""));
		this.getErrorLogs({ ...this.default_pagination });
	}

	onLimitChange(event) {
		this.selected_limit = event.target.value;
		this.default_pagination = {
			limit: this.selected_limit,
			skip: (this.page - 1) * this.selected_limit
		};
		// let filter = (<any>Object).fromEntries(Object.entries(this.searchQuery).filter(([key, val]) => val !=""));
		this.getErrorLogs({ ...this.default_pagination });
	}

}
