
let data = [];
axios.get('http://localhost:3000/myContacts')
    .then((response) => {
        console.log(response)
        const listsHTML = document.querySelector("#contacts>ol")
        data = response.data;

        response.data.forEach(item => {
            const {id, name, address, email, phone, company} = item;
            const itemHTML = `<li>
            Name : ${name}
            <br>
            Adrees : ${address}
            <br>
            Email : ${email}
            <br>
            Phone Number : ${phone}
            <br>
            Company :${company}
            <br>
                <button onclick="ubah(${id})">edit</button>
                <button onclick="hapus(${id})">hapus</button>
            </li>`;
            listsHTML.innerHTML += itemHTML;
        })
    })
    .catch((pesanError) => {
       // console.error(pesanError);
    })

document.getElementById('simpan').addEventListener('submit',function(event){
     //event.preventDefault();
    
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById ('email').value;
    const phone = document.getElementById('phone').value;
    const company = document.getElementById('company').value;

    data = {
        name : name,
        address : address,
        email : email,
        phone : phone,
        company : company
    }

    // console.log(data);
    // debugger;

    axios.post('http://localhost:3000/myContacts',data)
    .then( response => {
        console.log(response);
        window.alert('berhasil menambah data')

    })
    .catch( pesanError => {
        console.error(pesanError)
    } )  
})

const hapus = id => {
    axios.delete(`http://localhost:3000/myContacts/${id}`)
}

const ubah = id => {
    const contact = data.find(item => {
        return item.id === id
    })
    
    if (contact){
        const name = window.prompt('Name',contact.name);
        const address = window.prompt('address', contact.address);
        const email = window.prompt('email', contact.email);
        const phone = window.prompt('phone', contact.phone);
        const company = window.prompt('company', contact.company);
        axios.put(`http://localhost:3000/myContacts/${id}`,{
            name,
            address,
            email,
            phone,
            company,
        });
    }
}