import * as THREE from 'three'
import Stats from '../../../libs/three/Stats'
import OBJLoader from '../../../libs/three/OBJLoader'

export default {
  data () {
    return {
      camera: null,
      scene: null,
      renderer: null,
      points: null,
      container: null,
      stats: null
    }
  },
  created () {
    this.init()
    this.animate()
  },
  methods: {
    init () {
      this.camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 5, 3500)
      this.camera.position.z = 50
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0x050505)
      this.scene.fog = new THREE.Fog(0x050505, 2000, 3500)

      var objLoader = new OBJLoader()
      const self = this
      objLoader.load('/three/myObj.obj', function (group) {
        var material = new THREE.PointsMaterial({ size: 15, vertexColors: THREE.VertexColors })
        let geometry = group.children[0].geometry
        var particles = 5000 // 粒子的数量
        var colors = []
        var color = new THREE.Color()
        var n = 500; var n2 = n / 2 // particles spread in the cube
        for (var i = 0; i < particles; i++) {
          // positions
          var x = Math.random() * n - n2
          var y = Math.random() * n - n2
          var z = Math.random() * n - n2
          // colors
          var vx = (x / n) + 0.5
          var vy = (y / n) + 0.5
          var vz = (z / n) + 0.5
          color.setRGB(vx, vy, vz)
          colors.push(color.r, color.g, color.b)
        }
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3)) // 颜色数据
        geometry.computeBoundingSphere()
        console.log(geometry)
        console.log(material)
        self.points = new THREE.Points(geometry, material)
        self.scene.add(self.points)
      })
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2) // 设置canvas画布的大小
      document.body.appendChild(this.renderer.domElement)
      //
      this.stats = new Stats()
      document.body.appendChild(this.stats.dom)
      window.addEventListener('resize', this.onWindowResize, false)
    },
    render () {
      const self = this
      self.renderer.render(self.scene, self.camera)
    },
    // 窗口变动触发的函数
    onWindowResize () {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    animate () {
      // 更新控制器
      this.render()
      // 更新性能插件
      this.stats.update()
      requestAnimationFrame(this.animate)
    }
  }
}
