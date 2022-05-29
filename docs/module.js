const style = href => {
  const e = document.createElement('link')
  e.href = href
  e.rel = 'stylesheet'
  document.head.appendChild(e)
}

const script = src => {
  const e = document.createElement('script')
  e.src = src
  document.head.appendChild(e)
}

const init = () => {
  style('style.css')
  style('https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css')
  script('https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js')
}
init()

let map
const showMap = async (texts) => {
  const mapgl = mapboxgl
  mapgl.accessToken = 
    'pk.eyJ1IjoiaGZ1IiwiYSI6ImNsM3FtcWVjZzBidWgza3A3ajZzdjlnZDAifQ.wTaURNl4e3NMZHbw50LupQ'
  map = new mapgl.Map({
    container: 'map',
    hash: true,
    style: 'style.json',
    maxZoom: 24,
  })
  map.addControl(new mapgl.NavigationControl())
  map.addControl(new mapgl.ScaleControl({
    maxWidth: 200, unit: 'metric'
  }))

  let voice = null
  for(let v of speechSynthesis.getVoices()) {
    console.log(v.name)
    if ([
      'Daniel',
      'Google UK English Male',
      'Microsoft Libby Online (Natural) - English (United Kingdom)'
    ].includes(v.name)) voice = v
  }

  const DELTA_DISTANCE = 100
  const DELTA_BEARING = 15
  const DELTA_PITCH = 5
  const DELTA_Z = 0.4
  
  let easing = t => {
    return t * (2 - t)
  }

  map.on('load', () => {
    map.getCanvas().focus()
    map.getCanvas().addEventListener(
      'keydown',
      e => {
        // e.preventDefault()
        switch (e.which) {
          case 87: // w
            map.zoomTo(map.getZoom() - DELTA_Z, { easing: easing })
            break
          case 83: // s
            map.zoomTo(map.getZoom() + DELTA_Z, { easing: easing })
            break
          case 65: // a
            map.rotateTo(
              map.getBearing() - DELTA_BEARING, { easing: easing }
            )
            break
          case 68: // d
            map.rotateTo(
              map.getBearing() + DELTA_BEARING, { eaasing: easing }
            )
            break
          case 81: // q
            map.setPitch(map.getPitch() + DELTA_PITCH)
            break
          case 90: // z
            map.setPitch(map.getPitch() - DELTA_PITCH)
            break
        }
      }
    )
  })
}

window.onload = () => {
  showMap()
}
