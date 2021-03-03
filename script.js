const container = document.querySelector(".container");
const filterContainer = document.querySelector(".filter-container");
const clearFiltersBtn = document.querySelector(".clear-btn");
const jobList = document.querySelector(".jobs");
const alert = document.querySelector(".alert");

let filters = [];

const renderFiltersContainer = (filterText) => {
	filterContainer.classList.add("visible");
	addFilter(filterText);
};

const addFilter = (filterText) => {
	const filter = document.createElement("div");
	filter.classList.add("tag", "filter-tag");

	const textSpan = document.createElement("span");
	textSpan.className = "text";
	textSpan.innerText = `${filterText}`;
	textSpan.setAttribute("data-id", filterText.toLowerCase());

	const filterToBeAdded = textSpan.dataset.id;

	if (filters.includes(filterToBeAdded)) {
		alert.classList.add("visible");

		setTimeout(() => {
			alert.classList.remove("visible");
		}, 1000);

		return;
	} else {
		filters.push(filterToBeAdded);
	}

	const deleteFilter = document.createElement("button");
	deleteFilter.className = "delete-filter";
	deleteFilter.innerHTML = `<i class="fas fa-times"></i>`;

	filter.append(textSpan);
	filter.append(deleteFilter);

	deleteFilter.addEventListener("click", () => {
		deleteFilter.parentElement.remove();
		const removedFilter = textSpan.dataset.id;
		const removedFilterIndex = filters.indexOf(removedFilter);

		filters.splice(removedFilterIndex, 1);

		if (filters.length === 0) {
			filterContainer.classList.remove("visible");
		}
		reRenderJobList();
	});

	filterContainer.append(filter);

	clearFiltersBtn.insertAdjacentElement("beforebegin", filter);
	clearFiltersBtn.addEventListener("click", () => {
		filter.remove();
		filters = [];
		filterContainer.classList.remove("visible");
		reRenderJobList();
	});
};

const filteredData = (data) => {
	return data.filter((job) => {
		const allPossibleFilters = [
			job.role,
			job.level,
			...job.languages,
			...job.tools,
		];

		const allPossibleFiltersLowerCase = allPossibleFilters.map((filter) =>
			filter.toLowerCase()
		);

		if (filters.length === 0) {
			return job;
		} else if (
			filters.every((filter) => allPossibleFiltersLowerCase.includes(filter))
		) {
			return job;
		}
	});
};

const renderJobsList = (jobs) => {
	jobList.innerHTML = "";
	jobs.map((job) => {
		const box = document.createElement("div");
		box.className = "box";

		job.featured && box.classList.add("featured-job");

		const jobContent = renderJobDetails(job);
		const requirements = renderJobReq(job);

		box.append(jobContent);
		box.append(requirements);

		jobList.append(box);
	});
};

const renderJobDetails = (job) => {
	const jobContent = document.createElement("div");
	jobContent.className = "job-content";

	const logoContainer = document.createElement("div");
	logoContainer.className = "logo-container";
	const logo = document.createElement("img");

	logo.setAttribute("src", `${job.logo}`);

	const jobInfo = document.createElement("div");
	jobInfo.className = "job-info";

	jobInfo.innerHTML = `
	<div class="box-header">
		<p class="company-name">${job.company}</p>
		
		${job.new ? `<p class="new">New!</p>` : ""}
		${job.featured ? `<p class="featured">Featured</p>` : ""}
		
	</div>
	<div class="job-name">
		<h3>${job.position}</h3>
	</div>
	<div class="job-details">
		<p class="posting-date">${job.postedAt}</p>
		<p class="contract-type">${job.contract}</p>
		<p class="location">${job.location}</p>
	</div>
	`;

	logoContainer.appendChild(logo);
	jobContent.appendChild(logoContainer);
	jobContent.appendChild(jobInfo);

	return jobContent;
};

const renderJobReq = (job) => {
	const requirements = document.createElement("ul");
	requirements.className = "requirements";

	const requitedItems = [job.role, job.level, ...job.languages, ...job.tools];

	requitedItems.forEach((item) => {
		const tag = document.createElement("li");
		tag.innerText = item;
		tag.className = "tag";

		tag.setAttribute(`data-id`, item.toLowerCase());

		tag.addEventListener("click", () => {
			const text = tag.innerText;

			renderFiltersContainer(text);

			reRenderJobList();
		});
		requirements.append(tag);
	});
	return requirements;
};

const reRenderJobList = () => {
	const filteredJobs = filteredData(externalData);
	renderJobsList(filteredJobs);
};

window.addEventListener("DOMContentLoaded", () => {
	renderJobsList(externalData);
});
