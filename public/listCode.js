getData();
async function getData() {
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data) {
        const root = document.createElement('div');
        root.classList.add("rootFormat");
        const loc = document.createElement('div');
        loc.textContent = `${item.location}`;
        const date = document.createElement('div');
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;
        root.append(loc, date);
        document.body.append(root);
    }
    console.log(data);
}