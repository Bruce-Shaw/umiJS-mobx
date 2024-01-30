type Target = {
  id: string;
  onInsight: () => void;
  el?: HTMLElement;
};

const targetMap = new Map<string, Target>();

const observer: IntersectionObserver = new IntersectionObserver(
  (entries: IntersectionObserverEntry[]) => {
    entries.forEach((item: IntersectionObserverEntry) => {
      if (item.intersectionRatio >= 0.2) {
        const id = item.target.id;
        const target = targetMap.get(id);
        if (target) {
          target.onInsight();
        }
      }
    });
  },
  { threshold: [0.2] }
);

export const addTarget = (target: Target) => {
  const { id } = target;
  const el = document.getElementById(id);
  if (el) {
    observer?.observe(el);
    target.el = el;
    targetMap.set(id, target);
  }
};

export const removeTarget = (id: string) => {
  const target = targetMap.get(id);
  if (target) {
    observer?.unobserve(target.el as HTMLElement);
    targetMap.delete(id);
  }
};
