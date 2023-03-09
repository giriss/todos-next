import TodosApp from '@/components/Todos'
import type { NextPage } from 'next'
import Head from 'next/head'

const Todos: NextPage = () => (
  <>
    <Head>
      <title>Todos</title>
    </Head>
    <TodosApp />
  </>
)

export default Todos
