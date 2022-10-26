let currentSetting = "weekly";
const buttons = document.querySelectorAll(".c-tabs__tab-button");
const activityPanel = document.querySelector(".c-tabs__tabpanel");

//fetch data
const getData = async function () {
  const res = await fetch("./data.json");
  const data = await res.json();

  const renderActivityPanel = data
    .map((activity) => {
      const activityTitle = activity.title;
      const currentHrs = activity.timeframes[currentSetting].current + "hrs";
      const previousHrs = activity.timeframes[currentSetting].previous + "hrs";

      //map through to render each activity card
      return `
            <div class="c-tabs__listing c-tabs__listing--${formatActivityClass(
              activityTitle
            ).toLowerCase()}">
                <div class="c-card">
                    <div class="c-card__content-container">
                        <h2 class="c-card__activity">${activityTitle}</h2>
                        <span class="c-card__activity-time">${currentHrs}</span>
                        <a href="#" class="c-card__activity-details">
                            <img src="images/icon-ellipsis.svg" alt="get more information"/>
                        </a>
                        <h3 class="c-card__previous-heading">${previousMessage(
                          currentSetting
                        )} - <span class="c-card__previous-total">${previousHrs}</span></h3>
                    </div>
                </div>
            </div>
        `;
    })
    .join("");
  activityPanel.innerHTML = renderActivityPanel;
};

//update button active status based on click
function activatePanel(e) {
  const activePanel = document.querySelector(".active");

  //Add active class to current tab panel button
  if (e.target !== activePanel) {
    e.target.classList.add("active");
    e.target.setAttribute("aria-pressed", true);
    currentSetting = e.target.innerText.toLowerCase();
    getData(currentSetting);

    //remove active class from previous setting
    activePanel.classList.remove("active");
    activePanel.setAttribute("aria-pressed", false);
  }
}

//event listeners for buttons
buttons.forEach((button) => {
  button.addEventListener("click", activatePanel);
});

//remove extra white space from Self Care to create class name
function formatActivityClass(activityTitle) {
  formattedName = activityTitle.replace(/\s/g, "");
  return formattedName;
}

//format message in previous content
function previousMessage(currentSetting) {
  switch (currentSetting) {
    case "daily":
      return "Yesterday";
      break;
    case "monthly":
      return "Last Month";
      break;
    default:
      return "Last Week";
      break;
  }
}

//render activity panel
getData(currentSetting);
