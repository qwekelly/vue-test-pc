import * as THREE from 'three'
import OBJLoader from '../../../libs/three/OBJLoader'

export default {
  data () {
    return {
      camera: null,
      scene: null,
      renderer: null,
      points: null,
      container: null
    }
  },
  created () {
    this.init()
    this.animate()
  },
  methods: {
    init () {
      this.camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 5, 3500)
      this.camera.position.z = 100
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0x050505)
      this.scene.fog = new THREE.Fog(0x050505, 2000, 3500)

      var objLoader = new OBJLoader()
      const self = this
      objLoader.load('/three/ninjaHead_Low.obj', function (group) {
        let geometry = group.children[0].geometry
        // 创建纹理
        var material = new THREE.PointsMaterial({
          color: 0xffffff,
          size: 0.6,
          opacity: 0.6,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthTest: false
        })
        self.points = new THREE.Points(geometry, material)
        geometry.center() // 居中显示
        self.scene.add(self.points)
      })

      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2) // 设置canvas画布的大小
      document.body.appendChild(this.renderer.domElement)
      window.addEventListener('resize', this.onWindowResize, false)
    },
    render () {
      var time = Date.now() * 0.001
      if (this.points) {
        this.points.rotation.y = time * 0.5 // 左右转动
        // this.points.rotation.x = time * 0.25 // 上下转动
      }
      this.renderer.render(this.scene, this.camera)
    },
    // 窗口变动触发的函数
    onWindowResize () {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    animate () {
      this.render()
      requestAnimationFrame(this.animate)
    }
  }
}
