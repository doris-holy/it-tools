import { ArrowsShuffle } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.text-diff-analyzer.title'),
  path: '/text-diff-analyzer',
  description: translate('tools.text-diff-analyzer.description'),
  keywords: ['text', 'diff', 'analyzer', 'compare', 'string', 'text diff', 'code'],
  component: () => import('./text-diff-analyzer.vue'),
  icon: ArrowsShuffle,
  createdAt: new Date('2024-03-01'),
});
