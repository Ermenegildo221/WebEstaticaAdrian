 (function () {
      const canvas = document.getElementById('matrix');
      const ctx = canvas.getContext('2d');

      // Opciones iniciales
      let speed = 40;      // mayor -> más rápido (frames per second-ish)
      let density = 6;     // cuanto menor el número, mayor la densidad (columns por ancho relativo)
      let fontSize = 16;   // tamaño base de fuente (se ajusta con DPR)
      let running = true;

      // Caracteres usados (mezcla japonesa/latinos/números/símbolos)
      const chars = ('アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロゴゾドボポ').split('');

      let columns = 0;
      let drops = []; // posición vertical de cada columna en "filas" (índice de fila)
      let DPR = Math.max(1, window.devicePixelRatio || 1);

      function resize() {
        // tamaño físico para pantallas retina
        canvas.width = Math.floor(window.innerWidth * DPR);
        canvas.height = Math.floor(window.innerHeight * DPR);
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';

        // ajustar fontSize según DPR para mejor nitidez
        const base = fontSize * DPR;
        ctx.font = base + 'px monospace';

        // recalcular columnas (cuantas "letras" caben en el ancho)
        columns = Math.floor(canvas.width / base / (density / 6)); // density influye
        drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * 100)); // inits
      }

      // Dibujar cada frame
      let lastTime = 0;
      function frame(now) {
        if (!running) { requestAnimationFrame(frame); return; }
        // throttle por "speed" (aprox)
        if (!lastTime) lastTime = now;
        const delta = now - lastTime;
        const interval = 1000 / speed;
        if (delta < interval) {
          requestAnimationFrame(frame);
          return;
        }
        lastTime = now;

        const base = fontSize * DPR;

        // efecto de "fade" para crear estela
        // el alpha determina la longitud de estela: más alto -> estela más corta
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // texto verde brillante para el char actual
        ctx.fillStyle = '#00ff66';
        ctx.textBaseline = 'top';
        // para el "leading" y separación usamos base (tamaño de font)
        const columnWidth = Math.floor(canvas.width / columns);

        for (let i = 0; i < columns; i++) {
          const x = i * columnWidth + (columnWidth - base) / 2;
          const y = drops[i] * base;

          // caracter aleatorio
          const ch = chars[Math.floor(Math.random() * chars.length)];
          // dibujar
          ctx.fillText(ch, x, y);

          // avance: si sale de abajo, reinicia aleatoriamente
          if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          } else {
            drops[i]++;
          }
        }

        requestAnimationFrame(frame);
      }

      // Inicializar y handlers
      resize();
      requestAnimationFrame(frame);

      window.addEventListener('resize', () => {
        // debounce ligero
        clearTimeout(window._cmatrixResize);
        window._cmatrixResize = setTimeout(resize, 120);
      });

      // Controles UI (opcional)
      const toggleBtn = document.getElementById('toggle');
      const speedRange = document.getElementById('speed');
      const densityRange = document.getElementById('density');

      toggleBtn?.addEventListener('click', () => {
        running = !running;
        toggleBtn.textContent = running ? 'Pausar' : 'Reanudar';
      });

      speedRange?.addEventListener('input', (e) => {
        speed = Number(e.target.value);
      });

      densityRange?.addEventListener('input', (e) => {
        // convertimos control en factor razonable
        const val = Number(e.target.value);
        density = val;
        // reajustar tamaño de columnas al cambiar densidad
        resize();
      });

      // Mejora: pausar animación cuando la pestaña no está visible (ahorro batería)
      document.addEventListener('visibilitychange', () => {
        running = document.visibilityState === 'visible';
        if (toggleBtn) toggleBtn.textContent = running ? 'Pausar' : 'Reanudar';
      });
    })();