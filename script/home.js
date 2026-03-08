// function loadIssues() {
//  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues`)
//   .then(res => res.json())
//  .then(data => showIssues(data.data))
// }

// function showIssues(issues) {
//  const container = document.getElementById('issues-container');

//  container.innerHTML = ""
//  issues.forEach(issue => {
//   console.log(issue);
//   const card = document.createElement('div')
//   // div.className = `card ${issue.status}`
//   card.innerHTML = `
// <h3>${issue.title}</h3>
// <p>${issue.description}</p>
//   `;
//   container.appendChild(card)

//  });
// }
// loadIssues()

// let allIssues = [];

// fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
//   .then(res => res.json())
//   .then(data => {
//     allIssues = data.data;
//     showIssues(allIssues);
//   });

// document.getElementById('allBtn').addEventListener('click', () => {
//   showIssues(allIssues);
// });

// document.getElementById('openBtn').addEventListener('click', () => {
//   const openIssues = allIssues.filter(issue => issue.status === 'open');
//   showIssues(openIssues);
// });

// document.getElementById('closedBtn').addEventListener('click', () => {
//   const closedIssues = allIssues.filter(issue => issue.status === 'closed');
//   showIssues(closedIssues);
// });

// function showIssues(issues) {
//   const container = document.getElementById('issuesContainer');
//   container.innerHTML = '';

//   issues.forEach(issue => {
//     const card = document.createElement('div');

//     card.innerHTML = `
//       <h3>${issue.title}</h3>
//       <p>${issue.description}</p>
//       <div>
//       <p>${issue.labels}</p>
//       </div>
//       <p>${issue.author}</p>
//       <p>${issue.createdAt}</p>
//     `;

//     container.appendChild(card);
//   });
// }

let allIssues = [];

const loadIssues = () => {
  fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())

    .then(data => {
      allIssues = data.data;

      displayIssues(allIssues);
    });
};



const displayIssues = issues => {

  const container = document.getElementById('issues-container');

  container.innerHTML = '';

  issues.forEach(issue => {

    const div = document.createElement('div');

    const borderColor =
      issue.status === 'open' ? 'border-green-500' : 'border-purple-500';

    
    div.innerHTML = `

 <div  onclick="my_modal_5.showModal()" class="card bg-white p-4 border-t-4 ${borderColor}">

    <div class="flex justify-between items-center mb-2">
        <div class="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center">
            <span class="text-green-600"></span>
        </div>

        <span class="badge">
        ${issue.priority}</span>
    </div>

    <h2 class="font-bold text-lg">
        ${issue.title}
    </h2>

    <p class="text-gray-500 text-sm mt-1">
        ${issue.description}
    </p>
 
    <div class="flex gap-2 mt-3">
    <span class="badge badge-error ">${issue.labels}</span>
  </div>

    <div class="border-t mt-4 pt-2 text-sm text-gray-400">
        #${issue.id} by ${issue.author} <br>
        ${issue.createdAt}
    </div>
</div>
`;
    container.appendChild(div);
  });
};

document.getElementById('all-btn').addEventListener('click', () => {
  displayIssues(allIssues);
});

document.getElementById('open-btn').addEventListener('click', () => {
  const openIssues = allIssues.filter(issue => issue.status === 'open');

  displayIssues(openIssues);
});

document.getElementById('closed-btn').addEventListener('click', () => {
  const closedIssues = allIssues.filter(issue => issue.status === 'closed');

  displayIssues(closedIssues);
});
loadIssues()