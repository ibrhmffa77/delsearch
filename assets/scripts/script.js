addBtn.addEventListener("click", function (e) {
    e.preventDefault()
    let companyNameValue = companyNameInp.value
    let contactNameValue = contactNameInp.value
    let contactTitleValue = contactTitleInp.value

    let product = {
        companyName: companyNameValue,
        contactName: contactNameValue,
        contactTitle: contactTitleValue
    }
    axios.post(API_URL, product).then(res => console.log(res))
    companyNameInp.value = ""
    contactNameInp.value = ""
    contactTitleInp.value = ""
    renderList()
})

async function deleteProduct(id) {
    await axios.delete(`${API_URL}/${id}`) // 2san
    renderList() // 1sn
}
function renderList() {
    axios.get(API_URL).then(res => {
        let html = ""
        for (let i = 0; i < res.data.length; i++) {
            const {
                id,
                companyName,
                contactName,
                contactTitle
            } = res.data[i]
            html += `
            <tr>
            <th scope="row">${id}</th>
            <td>${companyName}</td>
            <td>${contactName}</td>
            <td>${contactTitle}</td>

            <td>    <!-- Button trigger modal -->
            <button
              type="button"
              class="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onclick="editProduct(${id})"
            >
              Edit
            </button></td>
            <td><button class="btn btn-danger" onclick="deleteProduct(${id})">Delete</button></td>
          </tr>
            `
        }
        items.innerHTML = html
    })
}
searchInp.addEventListener("keyup", function (e) {
    axios.get(API_URL).then(res => {
        let html = ""
        console.log(res.data) 
        console.log(e.target.value) 
        for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].name.includes(e.target.value)) {
                const {
                    id,
                    companyName,
                    contactName,
                    contactTitle
                } = res.data[i]
                html += `
                <tr>
                <th scope="row">${id}</th>
                <td>${companyName}</td>
                <td>${contactName}</td>
                <td>${contactTitle}</td>

                <td><button class="btn btn-warning">Edit</button></td>
                <td><button class="btn btn-danger" onclick="deleteProduct(${id})">Delete</button></td>
              </tr>
                `
            }
        }
        items.innerHTML = html
    })
})

function editProduct(id) {
    editInp1.setAttribute("data-id1", id)
    editInp2.setAttribute("data-id2", id)
    editInp3.setAttribute("data-id3", id)

    axios.get(`${API_URL}/${id}`).then(res => {
        editInp1.value = res.data.companyName
        editInp2.value = res.data.contactName
        editInp3.value = res.data.contactTitle
    })
}
editSaveBtn.addEventListener("click", async function (e) {
    e.preventDefault()
    let targetId1 = editInp1.getAttribute("data-id1")
    let targetId2 = editInp2.getAttribute("data-id2")
    let targetId3 = editInp3.getAttribute("data-id3")
    
    let newcompanyName = editInp1.value
    let newcontactName = editInp2.value
    let newcontactTitle = editInp3.value
    
    await axios.put(`${API_URL}/${targetId1}/${targetId2}/${targetId3}`, {
        companyName: newcompanyName,
        contactName: newcontactName,
        contactTitle:newcontactTitle
    }).then(res => console.log(res))
    renderList()
})
renderList()