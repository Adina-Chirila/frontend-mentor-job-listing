const tags = document.querySelectorAll(".tag");
const filterContainer = document.querySelector(".filter-container");
const clearFiltersBtn = document.querySelector(".clear-btn");
const jobList = document.querySelector(".jobs");

tags.forEach((tag) => {
	tag.addEventListener("click", () => {
		const text = tag.innerText;
		console.log(tag.innerText);
		handleFilters(text);
	});
});

const handleFilters = (text) => {
	//if the filter already exists in filter container don't add it again
	filterContainer.classList.add("visible");

	const filter = document.createElement("div");
	filter.classList.add("tag", "filter-tag");

	const textSpan = document.createElement("span");
	textSpan.className = "text";
	textSpan.innerText = `${text}`;

	const deleteFilter = document.createElement("button");
	deleteFilter.className = "delete-filter";
	deleteFilter.innerHTML = `<i class="fas fa-times"></i>`;

	filter.append(textSpan);
	filter.append(deleteFilter);

	deleteFilter.addEventListener("click", () => {
		deleteFilter.parentElement.remove();

		//if is no filter left hide filter container
	});

	filterContainer.append(filter);

	clearFiltersBtn.insertAdjacentElement("beforebegin", filter);
	clearFiltersBtn.addEventListener("click", () => {
		filter.remove();
		filterContainer.classList.remove("visible");
	});
};

//add jobList as a param
const updateInterface = () => {
	externalData.forEach((job) => {
		const box = document.createElement("div");
		box.className = "box";
		job.featured && box.classList.add("featured-job");

		const jobContent = document.createElement("div");
		jobContent.className = "job-content";

		const logoContainer = document.createElement("div");
		const logo = document.createElement("img");

		logo.setAttribute("src", `${job.logo}`);

		const jobInfo = document.createElement("div");
		jobInfo.className = "job-info";
		// to check with new
		jobInfo.innerHTML = `
        <div class="box-header">
			<p class="company-name">${job.role}</p>
            
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
		// jobContent.appendChild(requirements);
		box.append(jobContent);

		jobList.append(box);
	});
};

updateInterface();

{
	/* <ul class="requirements">
	<li class="tag">Frontend</li>
	<li class="tag">Senior</li>
	<li class="tag">HTML</li>
	<li class="tag">CSS</li>
	<li class="tag">JavaScript</li>
</ul> */
}
