let examples
try {
  examples = await (await fetch(new URL(location.hash.slice(1)).origin + '/models')).json()
} catch (e) {
  examples = [{ name: 'Error loading models', source: '.' }]
}

const menu = document.getElementById('menu')

export const init = loadExample => {
  const button = document.getElementById('menu-button')
  const content = document.getElementById('menu-content')

  // Menu button
  button.addEventListener('click', () => {
    menu.classList.toggle('open')
  })

  // Close menu when anything else is clicked
  window.addEventListener('click', e => {
    if (!button.contains(e.target) && !content.contains(e.target)) {
      dismiss()
    }
  })
  window.addEventListener('drop', () => dismiss())
  window.addEventListener('dragstart', () => dismiss())
  window.addEventListener('dragover', () => dismiss())

  // Add examples to menu
  const exampleDiv = document.getElementById('examples')
  examples.forEach(({ name, source }) => {
    const a = document.createElement('a')
    a.innerText = name
    a.addEventListener('click', async () => {
      console.log(`load example ${name}`)
      loadExample(await (await fetch(source)).text(), new URL(source, document.baseURI).toString())
    })
    const li = document.createElement('li')
    li.appendChild(a)
    exampleDiv.appendChild(li)
  })
}

const dismiss = () => {
  menu.classList.remove('open')
}
