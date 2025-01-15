import { createRoot } from 'react-dom/client'
import { App } from './components/app/_app'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/query-client'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'

const domNode = document.getElementById('root') as HTMLDivElement
const root = createRoot(domNode)
root.render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>
)
