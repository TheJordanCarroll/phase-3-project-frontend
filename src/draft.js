fetch(`http://localhost:3000/comments/${queencomment target blah blah}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: titleInput })
    })
        .then(response => response.json())
        .then(updatedcomment => {
            // pessimistic
            const titleH2 = document.querySelector('h2.title')
            titleH2.textContent = updatedcomment.title
        })
}