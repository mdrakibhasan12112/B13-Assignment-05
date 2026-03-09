




let allIssues = [];

const loadIssues = () => {
  toggleSpinner(true)

  document.getElementById('issues-container').classList.add('hidden');
  fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())

    .then(data => {
      allIssues = data.data;

      displayIssues(allIssues);
      toggleSpinner(false);
        document.getElementById('issues-container').classList.remove('hidden');
    });
};

const toggleSpinner = show => {
  const spinner = document.getElementById('spinner');
  if (show) {
    spinner.classList.remove('hidden');
  } else {
    spinner.classList.add('hidden');
  }
};



const cardDetails = async (id) => {
  toggleSpinner(true)

  document.getElementById('issues-container').classList.add('hidden');
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  // console.log(url);
  const res = await fetch(url)
  const details = await res.json()
  displayCardDetails(details.data);
  toggleSpinner(false)
    document.getElementById('issues-container').classList.remove('hidden');
}
const displayCardDetails = (issue) => {
  console.log(issue);
  const detailsBox = document.getElementById('details-container');
  detailsBox.innerHTML = `
   <div class="space-y-4">
<h3 class="text-2xl">${issue.title}</h3>

<div class="flex gap-2">
 <p class="bg-green-500 text-white rounded-2xl">${issue.status}</p>
 <p class="text-sm text-gray-400"><i class="fa-solid fa-circle"></i>Opened by ${issue.author}</p>
 <p class="text-sm text-gray-400"><i class="fa-solid fa-circle"></i>${issue.updatedAt}</p>
</div>

<div class="flex gap-2">
<p class="bg-red-300">${issue.labels[0]}</p>
<p class="bg-yellow-200">${issue.labels[1]}</p>
</div>

<p class="text-gray-500">${issue.description}</p>

<div class="flex justify-around">
 <p class="text-sm text-gray-400">Assignee: <br><span class="text-xl text-black">${issue.assignee}</span></p>
 <p class="text-sm text-gray-400">Priority: <br><span class="bg-red-400 text-xl text-black">${issue.priority}</span></p>
</div>
 </div>
  `;
  document.getElementById('my_modal_5').showModal();
}


const displayIssues = issues => {

  const container = document.getElementById('issues-container');

  container.innerHTML = '';
 document.getElementById('issue-count').innerText = issues.length;
  issues.forEach(issue => {

    const div = document.createElement('div');

    const borderColor =
      issue.status === 'open' ? 'border-green-500' : 'border-purple-500';

    
    div.innerHTML = `

 <div  onclick="cardDetails(${issue.id})" class="card bg-white p-4 border-t-4 ${borderColor}">

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
 
 <div class="flex gap-2">
<p class="bg-red-300">${issue.labels[0]}</p>
<p class="bg-yellow-200">${issue.labels[1]}</p>
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


const search = async () => {
  const searchText = document.getElementById('search-btn').value;

  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`;

  const res = await fetch(url);

  const data = await res.json();

  displayIssues(data.data);
};
