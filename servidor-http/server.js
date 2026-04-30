import http from 'http'
import fs from 'fs'
import queryString from 'querystring'
import { URLSearchParams } from 'url'

const PORTA = 3000
const HOST = 'localhost'
const cursos = [] // array que armazena os cursos

const server = http.createServer((req, res) => {
    // const {url, method} = req //    const url = req.url    const method = req.method
    console.log(req.url, ' - ', req.method)// conferir a requisição - URL e Método
    if(req.url === '/' && req.method === 'GET'){
        res.writeHead(200, {"content-type": 'text/html; charset=utf-8'})
        // res.write()
        res.end('<h1> Página Inicial </h1>')
    }else if(req.url === '/cadastro' && req.method === 'GET'){
         res.writeHead(200, {"content-type": 'text/html; charset=utf-8'})   
        res.end(fs.readFileSync('cadastro.html', 'utf-8'))
    } else if(req.url === '/cursos' && req.method === 'POST'){
        res.writeHead(200, {"content-type": 'text/html; charset=utf-8'})     
        let dados = ''
        req.on('data', chunk => {
            dados += chunk.toString()
        })
        req.on('end', () => {
            const dados_req = queryString.parse(dados) // curs=DS&ch=1200&tipo=tecnico = (curso: DS, ch: 1200,  tipo: tecnico)
            const dados_req1 = new URLSearchParams(dados) // converter os dados para um objeto mais fácil de manipular
            cursos.push(dados_req) // armazena os dados do array CURSOS

            //res.write('<h1> Cursos </h1>')          
            //res.end(`
            //    <h3> Curso: ${dados_req.curso} <br>
            //    Carga Horária: ${dados_req.ch} <br>
            //    Tipo: ${dados_req.tipo} </h3>`) // resposta em HTML

            res.end(JSON.stringify({
                curso: dados_req1.get('curso'), // pega o valor do campo CURSO
                ch: dados_req1.get('ch'),
                tipo: dados_req1.get('tipo') 
            }))

        })
    }
    else if(req.url === '/cursos' && req.method === 'GET'){
        res.writeHead(200, {"content-type": 'text/html; chartset=utf-8'})
        res.end(`
            <h1> Lista de Cursos </h1>
            <h3> ${cursos.map(curso => `
                <br> Curso: ${curso.curso} <br>
                Carga Horária: ${curso.ch} <br>
                Tipo: ${curso.tipo} <br> `)}
                </h3>`)
    }
    else{
        res.writeHead(404, {"content-type": 'text/html; charset=utf-8'})
        res.end('<h1> Página não localizada! </h1>')
    }
})

server.listen(PORTA, HOST,  () => {
    console.log(`Servidor rodando: http://${HOST}:${PORTA}`)
})