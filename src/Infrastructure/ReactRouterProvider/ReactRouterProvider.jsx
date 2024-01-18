import React from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import { About, Contact, ErrorPage, Home, Projects } from '../../UI/Pages'
import { Navbar } from '../../UI/Components'

function ReactRouterProvider() {
    return (
        <main className='bg-slate-300/20'>
            <HashRouter>
                <div className='overflow-hidden'>
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/projects" component={Projects} />
                        <Route exact path="/contact" component={Contact} />
                        <Route path="*">
                            <ErrorPage />
                        </Route>
                    </Switch>
                </div>
            </HashRouter>
        </main>
    )
}

export default ReactRouterProvider