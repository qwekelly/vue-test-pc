import * as THREE from 'three'
import Stats from '../../../libs/three/Stats'
// import PLYLoader from '../../../libs/three/PLYLoader'

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
      this.camera.position.z = 2750
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0x050505)
      this.scene.fog = new THREE.Fog(0x050505, 2000, 3500)
      //
      var particles = 50000 // 粒子的数量
      var geometry = new THREE.BufferGeometry() // 立方体
      var positions = []
      var colors = []
      var color = new THREE.Color()
      var n = 500; var n2 = n / 2 // particles spread in the cube
      for (var i = 0; i < particles; i++) {
        // positions
        var x = Math.random() * n - n2
        var y = Math.random() * n - n2
        var z = Math.random() * n - n2
        positions.push(x, y, z)
        // colors
        var vx = (x / n) + 0.5
        var vy = (y / n) + 0.5
        var vz = (z / n) + 0.5
        color.setRGB(vx, vy, vz)
        colors.push(color.r, color.g, color.b)
      }
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)) // 大小数据
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3)) // 颜色数据
      geometry.computeBoundingSphere()
      //
      var material = new THREE.PointsMaterial({ size: 15, vertexColors: THREE.VertexColors })
      this.points = new THREE.Points(geometry, material)
      this.scene.add(this.points)
      //
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2) // 设置canvas画布的大小
      document.body.appendChild(this.renderer.domElement)
      //
      this.stats = new Stats()
      document.body.appendChild(this.stats.dom)
      //
      window.addEventListener('resize', this.onWindowResize, false)
    },
    render () {
      var time = Date.now() * 0.001
      this.points.rotation.x = time * 0.25
      this.points.rotation.y = time * 0.5
      this.renderer.render(this.scene, this.camera)
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
