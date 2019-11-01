import * as THREE from 'three'
import Stats from '../../../libs/three/Stats'

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

      var objLoader = new THREE.ObjectLoader()
      const self = this
      objLoader.load('/three/cpbook2.json', function (group) {
        console.log(group)
        var material = new THREE.PointsMaterial({ size: 15, vertexColors: THREE.VertexColors })
        self.points = new THREE.Points(group, material)
        self.scene.add(self.points)
      })
      // var object = objLoader.parse('/three/cpbook2.json')
      // console.log(object)
      // self.scene.add(object)
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
