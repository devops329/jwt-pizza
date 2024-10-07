import React from 'react';
import View from './view';
import { pizzaService } from '../service/service';
import { useParams } from 'react-router-dom';
import { Endpoints } from '../service/pizzaService';

const apis = [
  { name: 'service', url: import.meta.env.VITE_PIZZA_SERVICE_URL },
  { name: 'factory', url: import.meta.env.VITE_PIZZA_FACTORY_URL },
];

const Docs = () => {
  const { docType } = useParams();
  const [docs, setDocs] = React.useState<Endpoints>({ endpoints: [] });
  React.useEffect(() => {
    (async () => {
      setDocs(await pizzaService.docs(docType!));
    })();
  }, []);

  return (
    <View title="JWT Pizza API">
      <div className="p-4">
        {docs.endpoints.map((doc, index) => (
          <div key={index} className="bg-slate-100 text-slate-800 p-4 m-4 rounded-xl">
            <h2 className="text-xl font-bold text-slate-600">
              {doc.requiresAuth && <span>🔐</span>} [{doc.method}] {doc.path}
            </h2>
            <p>{doc.description}</p>

            <div className="pt-3 overflow-hidden">
              <label className="font-bold">Example request</label>
              <div className="p-4 bg-neutral-600 text-neutral-50 font-mono text-xs mt-4 mx-4">{doc.example}</div>
            </div>
            <div className="pt-3 overflow-hidden">
              <label className="font-bold">Response</label>
              <pre className="p-4 bg-neutral-600 text-neutral-50 font-mono text-xs mt-4 mx-4">{JSON.stringify(doc.response, null, 2)}</pre>
            </div>
          </div>
        ))}
      </div>
      <div className="pe-4 pb-4 text-xs float-end text-neutral-500 text-end">
        {apis.map((api, index) => (
          <div key={index}>
            {api.name}:&nbsp;
            <a className="hover:underline hover:text-neutral-400" href={api.url}>
              {api.url}
            </a>
          </div>
        ))}
      </div>
    </View>
  );
};

export default Docs;
