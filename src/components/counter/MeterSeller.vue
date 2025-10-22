<template>
  <div class="flex items-center gap-2 min-h-8" :class="{
    'surprise': surpriseClass,
    'justify-between': (isExpanded && isMobile) || !isMobile,
    'justify-end': !isExpanded && isMobile
  }">
    <div class="flex items-center gap-2 transition-all duration-300 overflow-hidden" :class="{
      'w-0': !isExpanded && isMobile,
      'w-auto': isExpanded || !isMobile
    }">
      <ion-icon class="text-gray-700 flex-shrink-0" name="trophy"></ion-icon>
      <div class="flex flex-col min-w-0 flex-1 transition-opacity duration-150 delay-75"
        :class="{ 'opacity-0': !isExpanded && isMobile, 'opacity-100': isExpanded || !isMobile }">
        <span class="text-sm font-medium text-gray-700 truncate">{{ item?.seller?.name }}</span>
        <meter min="0" :max="WINNER_POINTS" low="8" high="15" optimum="20" :value="item.points"
          class="meter-progress w-full"></meter>
      </div>
    </div>
    <span class="rounded-md size-6 grid place-content-center font-semibold flex-shrink-0" :class="{
      'bg-purple-100/50 text-purple-600': item.points < WINNER_POINTS,
      'bg-green-light text-green-focus': item.points >= WINNER_POINTS
    }">
      {{ item.points }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { useValueIncrease } from '@/composable/useValueIncrease';
import { WINNER_POINTS } from '@/const/index'
import { useIsMobile } from '@/composable/useIsMobile';
import type { Seller } from '@/types/sellers';

const props = defineProps<{
  item: { points: number; seller?: Seller },
  isExpanded: boolean
}>()

const { isMobile } = useIsMobile()
const { shouldHighlight: surpriseClass } = useValueIncrease(
  () => props.item.points,
  1000
)
</script>
<style scoped>
.meter-progress {
  width: 100%;
  height: 4px;
  border-radius: 4px;
  background: #e5e7eb;
  overflow: hidden;
  appearance: none;
}

.meter-progress::-webkit-meter-bar {
  background: #e5e7eb;
  border: none;
  border-radius: 4px;
}

.meter-progress::-webkit-meter-optimum-value {
  background: linear-gradient(to right, #22c55e, #16a34a);
  border-radius: 4px;
}

.meter-progress::-webkit-meter-suboptimum-value {
  background: linear-gradient(to right, #facc15, #eab308);
  border-radius: 4px;
}

.meter-progress::-webkit-meter-even-less-good-value {
  background: linear-gradient(to right, #ef4444, #b91c1c);
  border-radius: 4px;
}

.meter-progress::-moz-meter-bar {
  background: linear-gradient(to right, #22c55e, #16a34a);
  border-radius: 4px;
}

.surprise {
  animation-name: surprise;
  -webkit-animation-name: surprise;
  -moz-animation-name: surprise;
  animation-duration: 1s;
  -webkit-animation-duration: .8s;
  -moz-animation-duration: .8s;
}

@keyframes surprise {
  0% {
    transform: rotate(0deg) scale(1, 1);
    ;
  }

  10% {
    transform: rotate(5deg) scale(1.1, 1.1);
  }

  20% {
    transform: rotate(-5deg) scale(1.1, 1.1);
  }

  30% {
    transform: rotate(5deg) scale(1.1, 1.1);
  }

  40% {
    transform: rotate(-5deg) scale(1.1, 1.1);
  }

  50% {
    transform: rotate(5deg) scale(1.1, 1.1);
  }

  60% {
    transform: rotate(-5deg) scale(1.1, 1.1);
  }

  50% {
    transform: rotate(5deg) scale(1.1, 1.1);
  }

  80% {
    transform: rotate(-5deg) scale(1.1, 1.1);
  }

  90% {
    transform: rotate(5deg) scale(1.1, 1.1);
  }

  100% {
    transform: rotate(0deg) scale(1, 1);
  }
}
</style>
