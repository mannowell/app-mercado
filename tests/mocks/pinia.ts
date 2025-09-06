import { vi } from 'vitest';

export function setupPiniaMocks() {
  vi.mock('pinia', async () => {
    const actual = await vi.importActual('pinia');
    
    return {
      ...actual,
      createPinia: vi.fn(() => ({
        install: vi.fn(),
        use: vi.fn(),
        state: {},
        _p: [],
        _a: null,
        _e: { scope: { _s: new Map() } },
        _s: new Map(),
        _testing: true
      })),
      defineStore: vi.fn((id, setup) => {
        const store = setup();
        return () => store;
      }),
      setActivePinia: vi.fn(),
      getActivePinia: vi.fn(() => ({
        _p: [],
        _a: null,
        _e: { scope: { _s: new Map() } },
        _s: new Map(),
        _testing: true
      })),
      storeToRefs: vi.fn((store) => {
        const refs = {};
        Object.keys(store).forEach((key) => {
          refs[key] = { value: store[key] };
        });
        return refs;
      }),
      mapStores: vi.fn((...stores) => {
        const mappedStores = {};
        stores.forEach((store) => {
          mappedStores[`${store}Store`] = function () {
            return this.$pinia._s.get(store);
          };
        });
        return mappedStores;
      }),
      mapState: vi.fn((useStore, keysOrMapper) => {
        const mapper = Array.isArray(keysOrMapper)
          ? keysOrMapper.reduce((reduced, key) => {
              reduced[key] = key;
              return reduced;
            }, {})
          : keysOrMapper;

        return Object.entries(mapper).reduce((reduced, [key, value]) => {
          // @ts-ignore
          reduced[key] = function mappedState() {
            const store = useStore(this.$pinia);
            return typeof value === 'function'
              ? value.call(this, store, this.$pinia.state.value[store.$id])
              : store[value];
          };
          return reduced;
        }, {});
      }),
      mapWritableState: vi.fn((useStore, keysOrMapper) => {
        return Object.entries(
          // @ts-ignore
          setupPiniaMocks().mapState(useStore, keysOrMapper)
        ).reduce((reduced, [key, value]) => {
          // @ts-ignore
          const originalFn = value;
          reduced[key] = {
            get() {
              return originalFn.call(this);
            },
            set(value) {
              const store = useStore(this.$pinia);
              const storeKey = keysOrMapper[key] || key;
              store[storeKey] = value;
            },
          };
          return reduced;
        }, {});
      }),
      mapActions: vi.fn((useStore, keysOrMapper) => {
        const mapper = Array.isArray(keysOrMapper)
          ? keysOrMapper.reduce((reduced, key) => {
              reduced[key] = key;
              return reduced;
            }, {})
          : keysOrMapper;

        return Object.entries(mapper).reduce((reduced, [key, value]) => {
          // @ts-ignore
          reduced[key] = function mappedAction(...args) {
            const store = useStore(this.$pinia);
            const action = store[value];
            return action.apply(this, [store, ...args]);
          };
          return reduced;
        }, {});
      }),
      mapGetters: vi.fn((useStore, keysOrMapper) => {
        return setupPiniaMocks().mapState(useStore, keysOrMapper);
      }),
    };
  });
}
