'use client'


import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react";
import { BookCopyIcon, BookOpenIcon, XIcon } from "lucide-react";


const NewUser = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    // Function to check or create user
    const checkOrCreateUser = async () => {
      if (isSignedIn && user) {
        try {
          const response = await fetch('/api/check-or-create-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              clerkId: user?.id,
              email: user?.emailAddresses[0].emailAddress
            }),
          });
          const data = await response.json();
          setIsUserRegistered(data.isRegistered);
        } catch (error) {
          console.error('Error checking or creating user:', error);
        }
      }
    };
    checkOrCreateUser();

  }, [isSignedIn, user]);

   // Handler to toggle the 'read more' state
   const handleReadMoreClick = () => {
    setIsExpanded(!isExpanded);
  };


  return (
    <div className=' flex justify-center items-center p-10 flex-col bg- space-x-4'>
      <div className='max-w-2xl flex justify-center items-center flex-col space-y-3'>
      <div className="fixed mx-auto inset-0 m-4 p-4 max-w-xs w-full bg-white/90 rounded-lg shadow-lg z-50 overflow-auto h-80 hover:h-full " >

  <h2 className="text-lg font-bold text-slate-900 p-4">Términos y Condiciones</h2>
  <p className={`text-sm leading-relaxed text-slate-600 ${isExpanded ? '' : 'line-clamp-3'}`}>
            
              TERMINOS DE USO

              15 Octubre, 2023.
              
              
              Gracias por confiar en Simple Life
              
              Simple Life es una Fundación orientada a mejorar la salud mental de todas las personas y desde ese espacio ofrecemos una Plataforma de atención y formación en bienestar general. Estos Términos de uso (&quot;Términos&quot;) rigen el uso que usted hace de nuestro sitio web, aplicaciones y otros productos y servicios (&quot;Servicios&quot;). Como algunos de nuestros Servicios pueden ser software que se descarga en su computadora, teléfono, tableta u otro dispositivo, usted acepta que podemos actualizar automáticamente este software y que estos Términos se aplicarán a dichas actualizaciones. Lea atentamente estos Términos y contáctenos si tiene alguna pregunta, solicitud de información o queja. Al hacer clic en &quot;Acepto&quot; (o, para aquellos que aún no han creado una cuenta, al utilizar nuestros Servicios), usted acepta estar sujeto a estos Términos, incluidas las políticas a las que se hace referencia en estos Términos. Al utilizar nuestros Servicios, usted acepta estar sujeto a estos Términos, incluidas las políticas a las que se hace referencia en estos Términos.
              
              ESTOS TÉRMINOS INCLUYEN UN ACUERDO DE ARBITRAJE Y UNA RENUNCIA A DEMANDA COLECTIVA QUE SE APLICAN A TODAS LAS RECLAMACIONES PRESENTADAS CONTRA SIMPLE LIFE. POR FAVOR LÉALOS DETENIDAMENTE; AFECTAN SUS DERECHOS LEGALES. LOS TÉRMINOS DEL ACUERDO DE ARBITRAJE Y LA RENUNCIA A DEMANDA COLECTIVA NO SE APLICARÁN SI NO SE PUEDEN APLICAR SEGÚN LAS LEYES DEL PAÍS EN EL QUE USTED RESIDE.
              
              
              1. USAR SIMPLE LIFE
              
              ¿Quién puede utilizar nuestros servicios?
              Queda estrictamente prohibido cualquier uso o acceso por parte de cualquier persona menor de 13 años.
              
              Además, puede utilizar nuestros Servicios solo si:
              Puede adquirir una de nuestras membresias o por medio de un convenio interinstitucional.
              Cumplir con estos Términos, todas las leyes aplicables y nuestras políticas (incluida la Política de uso aceptable.
              Tiene más de la edad en la que puede dar su consentimiento para el procesamiento de datos según las leyes de su país. Ciertas regiones y ofertas de contenido pueden tener requisitos adicionales y/o restricciones de edad diferentes.
              
              Cualquier violación de nuestros Términos, leyes aplicables o Políticas puede resultar en la suspensión, desactivación o cancelación de su acceso a la totalidad o parte de los Servicios.
              
              Cuando crea su cuenta de Simple Life y cuando utiliza posteriormente ciertas funciones, debe proporcionarnos información precisa y completa, y acepta actualizar su información para mantenerla precisa y completa.
              
              
              Nuestra Licencia para Usted
              Sujeto a estos Términos y nuestras Políticas, le otorgamos un derecho de licencia limitado, personal, no exclusivo, intransferible y revocable para utilizar nuestros Servicios. Los derechos otorgados en este documento son sólo para su uso personal y no comercial, a menos que obtenga nuestro permiso por escrito de lo contrario. También acepta que creará, accederá y/o utilizará solo una cuenta de usuario, a menos que Simple Life lo permita expresamente, y no compartirá el acceso a su cuenta ni la información de acceso a su cuenta con ningún tercero. El uso de nuestros Servicios no le otorga propiedad ni ningún derecho de propiedad intelectual sobre nuestros Servicios o el contenido al que accede.
              
              
              Uso Comercial
              Cualquier uso de nuestros Servicios con fines comerciales está estrictamente prohibido. Cualquier uso comercial debe estar sujeto a un acuerdo independiente con Simple Life, Inc. Consulte nuestra página Empresarial para obtener más información. Si usted es una organización que ya utiliza nuestros Servicios, se aplican términos separados. Estos términos no rigen la relación entre su organización y Simple Life.
              
              
              
              2. OFERTAS DE CONTENIDO
              
              Cambios en las ofertas de contenido
              Simple Life ofrece cursos y contenidos (&quot;Ofertas de contenido&quot;) de universidades y otros proveedores (&quot;Proveedores de contenido&quot;). Si bien buscamos brindar ofertas de contenido de clase mundial por parte de nuestros proveedores de contenido, ocurren eventos inesperados. Simple Life se reserva el derecho de cancelar, interrumpir, reprogramar o modificar cualquier oferta de contenido, o cambiar el valor en puntos o el peso de cualquier tarea, prueba u otra evaluación, ya sea únicamente o de acuerdo con las instrucciones del proveedor de contenido. Las ofertas de contenido están sujetas a las secciones Descargo de responsabilidad y Limitación de responsabilidad que aparecen a continuación.
              
              
              Sin crédito académico
              Simple Life no otorga crédito académico por la finalización de las ofertas de contenido. Sin embargo realizamos convenios con instituciones educativas y universidades que sí pueden otorgar créditos, la participación o finalización de las Ofertas de Contenido no confiere ningún crédito académico. Incluso si el crédito lo otorga una institución, no hay presunción de que otras instituciones aceptarán ese crédito. Usted acepta no aceptar crédito por completar una Oferta de Contenido a menos que haya obtenido un certificado de curso u otra documentación equivalente de su finalización de la Oferta de Contenido. Simple Life, los instructores y los proveedores de contenido asociados no tienen la obligación de que ninguna institución educativa u organización de acreditación reconozca las ofertas de contenido.
              
              
              Descargo de responsabilidad sobre la relación estudiante-proveedor de contenido
              Su participación en cualquier Oferta de Contenido por parte de Proveedores de Contenido: (a) establece ninguna relación entre usted y cualquier Proveedor de Contenido; (b) lo inscribe o registra en cualquier institución Proveedora de Contenido, o en cualquier Oferta de Contenido ofrecida por cualquier institución Proveedora de Contenido; o (c) le da derecho a utilizar los recursos de cualquier institución proveedora de contenido más allá de la participación en la Oferta de contenido.
              
              
              
              3. TU CONTENIDO
              
              Contenido del usuario
              Los Servicios le permiten compartir su contenido, como tareas, pruebas, exámenes, proyectos, otras tareas que envíe, publicaciones que realice en los foros y similares (&quot;Contenido de usuario&quot;), con Simple Life, instructores y/o otros usuarios. Usted conserva todos los derechos de propiedad intelectual y es responsable del Contenido de usuario que crea y comparte. El Contenido de usuario no incluye el contenido del curso u otros materiales disponibles o colocados en la plataforma Simple Life por o en nombre de los Proveedores de contenido o sus instructores que utilizan los Servicios u Ofertas de contenido. Entre Simple Life y los proveedores de contenido, dichas ofertas de contenido se rigen por los acuerdos pertinentes vigentes entre Simple Life y los proveedores de contenido.
              
              
              Cómo Simple Life y otros pueden utilizar el contenido del usuario
              En la medida en que proporcione Contenido de usuario, otorga a Simple Life una licencia mundial totalmente transferible, libre de regalías, perpetua, sublicenciable, no exclusiva para copiar, distribuir, modificar y crear trabajos derivados basados en, realizar públicamente y exhibir públicamente. y utilizar de otro modo el Contenido del usuario. Esta licencia incluye otorgar a Simple Life el derecho de autorizar a los proveedores de contenido a utilizar el Contenido del usuario con sus estudiantes registrados, estudiantes en el campus u otros estudiantes independientes de los Servicios. Nada en estos Términos restringirá otros derechos legales que Simple Life pueda tener sobre el Contenido del usuario, por ejemplo, bajo otras licencias.
              
              Nos reservamos el derecho de eliminar o modificar el Contenido del usuario por cualquier motivo, incluido el Contenido del usuario que creemos que viola estos Términos u otras políticas, incluida nuestra Política de uso aceptable y Código de conducta.
              
              
              Comentario
              Agradecemos sus sugerencias, ideas, comentarios y otros comentarios sobre los Servicios (&quot;Comentarios&quot;). Al enviar cualquier comentario, nos otorga el derecho de utilizar los comentarios sin ninguna restricción ni compensación para usted. Al aceptar sus comentarios, Simple Life no renuncia a ningún derecho a utilizar comentarios similares o relacionados previamente conocidos por Simple Life, desarrollados por nuestros empleados, contratistas u obtenidos de otras fuentes.
              
              
              
              4. SEGURIDAD
              
              Nos preocupamos por la seguridad de nuestros usuarios. Si bien trabajamos para proteger la seguridad de su cuenta y la información relacionada, Simple Life no puede garantizar que terceros no autorizados no puedan burlar nuestras medidas de seguridad. Notifíquenos de inmediato sobre cualquier compromiso o uso no autorizado de su cuenta enviando un correo electrónico a soy@SimpleLifeOfficial.com
              
              
              
              5. CONTENIDO DE TERCEROS
              
              A través de los Servicios, tendrá la posibilidad de acceder y/o utilizar contenido proporcionado por instructores, otros usuarios y/u otros terceros y enlaces a sitios web y servicios mantenidos por terceros. Simple Life no puede garantizar que dicho contenido de terceros, en los Servicios o en otros lugares, esté libre de material que usted pueda encontrar objetable o inapropiado o de malware u otros contaminantes que puedan dañar su computadora, dispositivo móvil o cualquier archivo que contenga. Simple Life renuncia a cualquier responsabilidad u obligación relacionada con su acceso o uso, o la imposibilidad de acceder o utilizar, dicho contenido de terceros.
              
              
              
              6. DERECHOS DE AUTOR Y MARCAS COMERCIALES
              
              Simple Life respeta los derechos de propiedad intelectual de nuestros usuarios, proveedores de contenido y otros terceros y espera que nuestros usuarios hagan lo mismo al utilizar los Servicios. Hemos adoptado e implementado la Política de marcas comerciales y derechos de autor de Simple Life a continuación de acuerdo con la ley aplicable, incluida la Ley de derechos de autor del milenio digital.
              
              
              
              7. INVESTIGACIÓN EN EDUCACIÓN
              
              Simple Life se compromete a promover la ciencia del aprendizaje y la enseñanza, y los registros de su participación en los cursos pueden usarse para investigaciones educativas. En interés de esta investigación, usted puede estar expuesto a variaciones en las ofertas de contenido. Los resultados de la investigación normalmente se informarán a nivel agregado. Su identidad personal no se divulgará públicamente en ningún resultado de investigación sin su consentimiento expreso.
              
              
              
              8. SERVICIOS PAGOS DE SIMPLE LIFE
              
              Simple Life ofrece Servicios pagos (por ejemplo, certificados de cursos para ciertos cursos) por una tarifa. A menos que se indique lo contrario, las tarifas se cotizan en moneda local. Usted es responsable de pagar todas las tarifas cobradas por o para Simple Life y los impuestos aplicables de manera oportuna con un mecanismo de pago asociado con los Servicios pagos aplicables. Si su método de pago falla o su cuenta está vencida, podemos cobrar tarifas utilizando otros mecanismos de cobro. Las tarifas pueden variar según su ubicación y otros factores, y Simple Life se reserva el derecho de cambiar cualquier tarifa en cualquier momento a su exclusivo criterio. Cualquier cambio, actualización o modificación entrará en vigor inmediatamente después de su publicación a través de los Servicios correspondientes. Es posible que haya reembolsos disponibles para Servicios pagos como se describe en nuestra Política de pagos y reembolsos a continuación.
              
              
              Programas con Certificado Universitario
              Los Servicios pueden permitirle inscribirse en programas con Certificado Universitario o programas similares ofrecidos por nuestros Proveedores de Contenido en la plataforma Simple Life. Nuestros proveedores de contenido actúan como proveedores de educación a distancia de estos programas y determinan las políticas y requisitos de admisión, reembolso y graduación o finalización. Nada en estos Términos restringirá la aplicabilidad para usted de cualquier política institucional establecida por nuestro Proveedor de contenido en relación con estos programas (por ejemplo, códigos de conducta estudiantil); dichas políticas complementarán estos Términos y, en la medida en que exista un conflicto entre dichas políticas y estos Términos, entre usted y nuestro Proveedor de contenido, prevalecerán las políticas de nuestro Proveedor de contenido.
              
              Dependiendo del programa, Simple Life o nuestros socios de contenido pueden cobrar los pagos de matrícula y tarifas de estos programas. Si su método de pago falla o su cuenta está vencida, nosotros o nuestros Socios de Contenido podemos cobrar la matrícula y las tarifas utilizando otros mecanismos de cobro. La matrícula y las tarifas pueden variar según su ubicación y otros factores, y Simple Life y sus socios de contenido se reservan el derecho de cambiar cualquier matrícula y tarifas para semestres futuros o períodos de pago equivalentes a su exclusivo criterio. Es posible que haya reembolsos disponibles para Servicios pagos como se describe en nuestra Política de reembolso a continuación. Le recomendamos que investigue y considere si la matrícula y las tarifas requeridas para las ofertas de contenido se alinean con sus objetivos profesionales y financieros.
              
              La certificación y los requisitos laborales para diversas profesiones pueden variar en cada estado y país, y los requisitos laborales pueden variar según el empleador. Simple Life no garantiza la licencia, certificación o calificación para ninguna profesión o trabajo en función de la finalización de una oferta de contenido en Simple Life. Se le recomienda investigar, comprender y cumplir con los requisitos del estado y/o país correspondiente en el que trabaja o pretende trabajar, y que investigue si la Oferta de Contenido en la que pretende inscribirse satisface sus necesidades académicas y/o profesionales. antes de inscribirse.
              
              
              
              9. MODIFICAR O CANCELAR NUESTROS SERVICIOS
              
              Estamos constantemente cambiando y mejorando nuestros Servicios. Podemos agregar o eliminar funciones, características o requisitos, y podemos suspender (en la medida permitida por la ley aplicable) o detener parte de nuestros Servicios por completo. En consecuencia, Simple Life puede cancelar su uso de cualquier Servicio por cualquier motivo. Si se cancela su uso de un Servicio pago, es posible que haya un reembolso disponible según nuestra Política de reembolso. Es posible que no podamos prestar los Servicios a determinadas regiones o países por diversos motivos, incluso debido a requisitos de control de exportaciones aplicables o limitaciones y restricciones de acceso a Internet por parte de los gobiernos. Ninguno de Simple Life, sus proveedores de contenido e instructores, sus contribuyentes, patrocinadores y otros socios comerciales, ni sus empleados, contratistas y otros agentes (las &quot;Partes de Simple Life&quot;) tendrán responsabilidad alguna ante usted por dicha acción. Puede dejar de utilizar nuestros Servicios en cualquier momento, aunque lamentaremos que se vaya.
              
              
              
              10. DESCARGOS DE RESPONSABILIDAD
              
              EN LA MEDIDA MÁXIMA PERMITIDA POR LA LEY, LOS SERVICIOS Y TODO EL CONTENIDO INCLUIDO SE PROPORCIONAN &quot;TAL CUAL&quot; SIN GARANTÍA DE NINGÚN TIPO, YA SEA EXPRESA O IMPLÍCITA. LAS PARTES DE SIMPLE LIFE RECHAZAN ESPECÍFICAMENTE CUALQUIER GARANTÍA Y CONDICIÓN DE COMERCIABILIDAD, IDONEIDAD PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN, Y CUALQUIER GARANTÍA QUE SURJA DEL CURSO DE LA NEGOCIACIÓN O DEL USO DEL COMERCIO. LAS PARTES DE SIMPLE LIFE ADEMÁS RENUNCIA A TODA RESPONSABILIDAD RELACIONADA CON SU ACCESO O USO DE LOS SERVICIOS O CUALQUIER CONTENIDO RELACIONADO. USTED RECONOCE Y ACEPTA QUE CUALQUIER ACCESO O USO DE LOS SERVICIOS O DICHO CONTENIDO ES BAJO SU PROPIO RIESGO.
              
              
              
              11. LIMITACIÓN DE RESPONSABILIDAD
              
              EN LA MEDIDA MÁXIMA PERMITIDA POR LA LEY, LAS PARTES DE SIMPLE LIFE NO SERÁN RESPONSABLES DE NINGÚN DAÑO INDIRECTO, INCIDENTAL, ESPECIAL, CONSECUENCIAL O PUNITIVO, NI DE CUALQUIER PÉRDIDA DE GANANCIAS O INGRESOS, YA SEA INCURRIDO DIRECTA O INDIRECTAMENTE, NI DE CUALQUIER PÉRDIDA DE DATOS, USO, BUENA VOLUNTAD U OTRAS PÉRDIDAS INTANGIBLES QUE RESULTEN DE: (A) SU ACCESO O USO O INCAPACIDAD DE ACCEDER O UTILIZAR LOS SERVICIOS; (B) CUALQUIER CONDUCTA O CONTENIDO DE CUALQUIER PARTE DISTINTA DE LA PARTE SIMPLE LIFE CORRESPONDIENTE, INCLUYENDO SIN LIMITACIÓN, CUALQUIER CONDUCTA DIFAMATORIA, OFENSIVA O ILEGAL; O (C) ACCESO, USO O ALTERACIÓN NO AUTORIZADO DE SU CONTENIDO O INFORMACIÓN. EN NINGÚN CASO LA RESPONSABILIDAD TOTAL DE SIMPLE LIFE POR TODAS LAS RECLAMACIONES RELACIONADAS CON LOS SERVICIOS SUPERARÁ LOS VEINTE DÓLARES ESTADOUNIDENSES ($20) O LA CANTIDAD TOTAL DE LAS TARIFAS RECIBIDAS POR SIMPLE LIFE DE USTED POR EL USO DE LOS SERVICIOS PAGADOS DURANTE LOS ÚLTIMOS SEIS MESES, LO QUE SEA MAYOR.
              
              USTED RECONOCE Y ACEPTA QUE LAS EXENCIONES DE RESPONSABILIDAD Y LAS LIMITACIONES DE RESPONSABILIDAD ESTABLECIDAS EN ESTOS TÉRMINOS DE USO REFLEJAN UNA DISTRIBUCIÓN RAZONABLE Y JUSTA DE RIESGOS ENTRE USTED Y LAS PARTES DE SIMPLE LIFE, Y QUE ESTAS LIMITACIONES SON UNA BASE ESENCIAL PARA LA CAPACIDAD DE SIMPLE LIFE DE REALIZAR EL SERVICIOS DISPONIBLES PARA USTED DE FORMA ECONÓMICA FACIL.
              USTED ACEPTA QUE CUALQUIER CAUSA DE ACCIÓN RELACIONADA CON LOS SERVICIOS DEBE COMENZAR DENTRO DE UN (1) AÑO DESPUÉS DE QUE SE ACUERDE LA CAUSA DE LA ACCIÓN. DE LO CONTRARIO, DICHA CAUSA DE ACCIÓN QUEDA PERMANENTEMENTE PROHIBIDA.
              
              
              
              12. CONTROLES DE EXPORTACIÓN
              
              Usted garantiza que no se encuentra ni reside habitualmente en ningún país que esté sujeto a las leyes y regulaciones aplicables de los EE. UU. que impidan que Simple Life le brinde acceso a los Servicios. Su ubicación está determinada por su ubicación física. Está estrictamente prohibido el uso de un servicio de red privada virtual, servicios de enrutamiento IP u otro servicio similar con el fin de eludir estas leyes.
              
              Usted garantiza que no figura en ninguna lista de partes prohibidas, denegadas, no verificadas, sanciones, inhabilitaciones o exclusiones del gobierno ni en ninguna lista de partes restringidas relacionadas con exportaciones controladas (colectivamente, &quot;Listas de sanciones&quot;). Interrumpirá inmediatamente el uso de los Servicios si se le incluye en alguna Lista de sanciones. También garantiza que no exportará, reexportará ni transferirá los Servicios a una entidad incluida en ninguna Lista de sanciones ni utilizará los servicios de ninguna manera que infrinja las leyes aplicables.
              
              Sin perjuicio de cualquier disposición en contrario en estos Términos, Simple Life puede rescindir cualquier obligación adicional hacia usted, con efecto inmediato si usted incumple las obligaciones establecidas en esta sección.
              
              
              
              13. INDEMNIZACIÓN
              
              Usted acepta indemnizar, defender y eximir de responsabilidad a las Partes de Simple Life de todos y cada uno de los reclamos, responsabilidades, gastos y daños (en la medida que le sean atribuibles según la ley aplicable), incluidos los honorarios y costos razonables de abogados, realizados por cualquier tercero relacionado con: (a) su uso o intento de uso de los Servicios en violación de estos Términos; (b) su violación de cualquier ley o derecho de cualquier tercero; o (c) Contenido del usuario, incluido, entre otros, cualquier reclamo de infracción o apropiación indebida de propiedad intelectual u otros derechos de propiedad.
              
              
              
              14. ARBITRAJE VINCULANTE Y RENUNCIA A DEMANDA COLECTIVA
              
              Usted y Simple Life acuerdan someterse a arbitraje vinculante todas y cada una de las disputas, reclamos o controversias de cualquier tipo, ya sea que se basen en estatutos, regulaciones, constituciones, derecho consuetudinario, equidad o cualquier otra base o teoría legal, y ya sean preexistentes. , presente o futuro, que surjan de o se relacionen con nuestros Servicios, estos Términos y/o cualquier otra relación o disputa entre usted y nosotros, incluido, entre otros, (i) el alcance, la aplicabilidad o la exigibilidad de estos Términos y/o o esta disposición de arbitraje, y (ii) relaciones con terceros que no son partes de estos Términos o esta disposición de arbitraje en la máxima medida permitida por la ley aplicable (cada una una (&quot;Reclamación(&quot; y colectivamente las &quot;Reclamaciones&quot;).
              
              Todas y cada una de las Reclamaciones se presentarán para arbitraje vinculante de acuerdo con las Reglas de Arbitraje del Consumidor de la Asociación Estadounidense de Arbitraje (las &quot;Reglas AAA&quot;), según enmendadas, vigentes en el momento en que se inicia el arbitraje. Las Reglas AAA están disponibles en línea en www.adr.org o llamando al (800) 778-7879 y se incorporan al presente como referencia. En caso de cualquier inconsistencia entre esta disposición de arbitraje y las Reglas AAA, dicha inconsistencia se resolverá a favor de esta disposición. Si decide iniciar el arbitraje, acepta pagar la tarifa de iniciación de $200 (o el monto requerido por las Reglas de la AAA), y nosotros aceptamos pagar la tarifa de iniciación del arbitraje restante y cualquier depósito adicional requerido por la AAA para iniciar su arbitraje. Pagaremos los costos del procedimiento de arbitraje, incluidos los honorarios del árbitro; sin embargo, otros honorarios, como honorarios de abogados y gastos de viaje al arbitraje, se pagarán de conformidad con las Reglas de la AAA y la ley aplicable. Pagaremos todos los costos asociados con cualquier arbitraje que iniciemos. Un árbitro único y neutral seleccionado de acuerdo con las Reglas AAA decidirá todas las Reclamaciones.
              
              El árbitro deberá ser un miembro activo y acreditado del colegio de abogados de cualquier estado de los Estados Unidos continentales y deberá participar activamente en la práctica del derecho durante al menos cinco años o ser un juez jubilado. El árbitro honrará los reclamos de privilegio reconocidos por la ley. A menos que sea incompatible con la ley aplicable, y salvo que se disponga lo contrario en el presente, cada parte correrá con los gastos de sus respectivos honorarios de abogado, perito y testigo, independientemente de cuál de las partes prevalezca en el arbitraje. Cualquier procedimiento de arbitraje se llevará a cabo en el distrito judicial federal de su residencia y se le dará la oportunidad de asistir al procedimiento y ser escuchado. La decisión del árbitro será definitiva y vinculante para las partes y podrá hacerse cumplir en cualquier tribunal federal o estatal que tenga jurisdicción. Usted y nosotros aceptamos que el arbitraje se mantendrá confidencial y que la existencia del procedimiento y cualquier elemento del mismo (incluidos, entre otros, alegatos, escritos u otros documentos presentados o intercambiados y cualquier testimonio u otras presentaciones y laudos orales) no se divulgará más allá del procedimiento de arbitraje, excepto que sea legalmente requerido en procedimientos judiciales relacionados con el arbitraje o por las reglas y regulaciones de divulgación aplicables de agencias gubernamentales.
              
              Ni usted ni Simple Life podrán actuar como representantes de un grupo, ni participar como miembros de un grupo de reclamantes, con respecto a ningún Reclamo. Las Reclamaciones no pueden ser arbitradas sobre una base colectiva o representativa. El árbitro puede decidir únicamente sus Reclamos individuales y/o los de Simple Life. El árbitro no podrá consolidar ni acumular reclamaciones de otras personas o partes que puedan encontrarse en situación similar. En consecuencia, usted y nosotros aceptamos que las Reglas complementarias de la AAA para arbitrajes colectivos no se aplican a nuestro arbitraje. Esta disposición de arbitraje y los procedimientos aplicables al arbitraje contemplado en esta disposición se rigen por la Ley Federal de Arbitraje, sin perjuicio de cualquier ley estatal que resulte aplicable.
              
              Este acuerdo de arbitraje no nos impide a usted o a nosotros buscar acciones por parte de agencias gubernamentales federales, estatales o locales. Usted y nosotros también tenemos derecho a ejercer recursos de autoayuda, como la compensación, o a presentar reclamos calificados en un tribunal de reclamos menores siempre que el asunto permanezca en dicho tribunal y avance solo hacia un individuo (que no sea de clase, no -representativo). Además, usted y nosotros conservamos el derecho de solicitar a cualquier tribunal de jurisdicción competente una reparación provisional o auxiliar, incluidos embargos prearbitrales o medidas cautelares preliminares, y dicha solicitud no se considerará incompatible con ninguno de estos Términos, ni una renuncia. del derecho a someter las controversias a arbitraje según lo dispuesto en esta disposición.
              
              Un tribunal puede eliminar cualquier parte de esta Sección de Arbitraje Vinculante y Renuncia a Demandas Colectivas que considere inaplicable, excepto las prohibiciones de que cualquier Reclamación se maneje de forma colectiva o representativa, y las partes restantes de esta disposición de arbitraje seguirán siendo válidas y ejecutable. Ninguna renuncia a cualquier disposición de esta Sección será efectiva o ejecutable a menos que se registre en un escrito firmado por la parte que renuncia a tal derecho o requisito. Dicha renuncia no renunciará ni afectará ninguna otra parte de estos Términos.
              
              ESTA SECCIÓN DE ARBITRAJE VINCULANTE Y RENUNCIA A DEMANDA COLECTIVA LIMITA CIERTOS DERECHOS, INCLUYENDO EL DERECHO A MANTENER UNA ACCIÓN TRIBUNAL, EL DERECHO A UN JUICIO CON JURADO, EL DERECHO A PARTICIPAR EN CUALQUIER FORMA DE RECLAMACIÓN COLECTIVA O REPRESENTATIVA, Y EL DERECHO A PARTICIPAR EN EL DESCUBRIMIENTO, EXCEPTO QUE DISPONIBLE EN LAS REGLAS AAA. OTROS DERECHOS QUE USTED O SIMPLE LIFE TENDRÍAN EN EL TRIBUNAL TAMBIÉN PUEDEN NO ESTAR DISPONIBLES EN EL ARBITRAJE.
              
              
              
              15. TÉRMINOS GENERALES
              
              Revisiones de los Términos
              Nos reservamos el derecho de revisar los Términos a nuestro exclusivo criterio en cualquier momento. Cualquier revisión de los Términos entrará en vigor inmediatamente después de que la publiquemos. Para cualquier cambio importante en los Términos, tomaremos medidas razonables para notificarle dichos cambios, a través de un banner en el sitio web, notificación por correo electrónico, otro método o combinación de métodos. En todos los casos, su uso continuado de los Servicios después de la publicación de dichos cambios, con o sin notificación, constituye la aceptación vinculante de los Términos revisados.
              
              
              Divisibilidad; Exención
              Si resulta que una disposición particular de estos Términos no es aplicable, esto no afectará ningún otro término. Si no cumple con estos Términos y no tomamos medidas inmediatas, esto no indica que renunciemos a ningún derecho que podamos tener (como tomar medidas en el futuro).
              
              
              Proveedores de contenido
              Nuestros Proveedores de contenido y proveedores de servicios integrados son terceros beneficiarios de los Términos y pueden hacer cumplir las disposiciones de los Términos que se relacionan con ellos.
              
              
              
              
              
              
              
              POLÍTICA DE USO ACEPTABLE
              
              
              Nuestra misión es brindar acceso universal a la mejor educación del mundo. Creemos firmemente en preservar la libertad de expresión de nuestros usuarios, así como la libertad académica de nuestros proveedores de contenido e instructores. También queremos asegurarnos de que todos nuestros usuarios e instructores se sientan seguros y cómodos al utilizar nuestros Servicios. Hemos redactado esta política para garantizar que las personas comprendan y sigan las reglas al participar en nuestra comunidad en línea y al utilizar nuestros Servicios.
              
              Podemos eliminar o editar contenido o actividad inapropiada que hayamos identificado o informado. Podemos suspender, deshabilitar o cancelar por separado el acceso de un usuario a todos o parte de los Servicios.
              
              1. Tiene prohibido utilizar nuestros Servicios para compartir contenido que:
              
              Contiene contenido ilegal o promueve actividades ilegales con la intención de cometer dichas actividades. Tenga en cuenta que los usuarios de hasta 13 años utilizan Simple Life y no permitimos contenido que sea inapropiado para estos usuarios más jóvenes.
              Contiene amenazas creíbles u organiza actos de violencia en el mundo real. No permitimos contenido que cree un riesgo real de lesiones físicas o daños a la propiedad, que amenace de manera creíble a las personas o la seguridad pública, ni que organice o fomente daños.
              Acosa a otros. Fomentamos los comentarios sobre personas y asuntos de interés público, pero no se permite contenido abusivo o inapropiado dirigido a particulares.
              Viola la propiedad intelectual, la privacidad u otros derechos. No comparta contenido que no tiene derecho a compartir, no reclame contenido que no creó como propio, ni infrinja o se apropie indebidamente de otra manera de la propiedad intelectual u otros derechos de otra persona. Siempre atribuya los materiales utilizados o citados por usted al propietario original de los derechos de autor.
              Envía spam a otros. No comparta contenido publicitario, promocional o de solicitud irrelevante o inapropiado.
              Viole de otro modo los Términos de uso de Simple Life.
              Tenga en cuenta que las ofertas de contenido específicas pueden tener reglas y requisitos adicionales.
              
              
              2. Tampoco puedes:
              
              Hacer cualquier cosa que viole las leyes locales, estatales, nacionales o internacionales o incumpla cualquiera de sus obligaciones contractuales o deberes fiduciarios.
              Comparta su contraseña, permita que cualquier persona además de usted acceda a su cuenta o haga cualquier cosa que pueda poner su cuenta en riesgo.
              Intentar acceder a la cuenta de cualquier otro usuario.
              Reproducir, transferir, vender, revender o hacer mal uso de cualquier contenido de nuestros Servicios, a menos que esté específicamente autorizado para hacerlo.
              Acceder, alterar o utilizar áreas no públicas de nuestros sistemas, a menos que esté específicamente autorizado para hacerlo.
              Romper o eludir nuestras medidas de autenticación o seguridad o probar de otro modo la vulnerabilidad de nuestros sistemas o redes, a menos que esté específicamente autorizado para hacerlo.
              Intentar realizar ingeniería inversa en cualquier parte de nuestros Servicios.
              Intente interferir con cualquier usuario, host o red, por ejemplo enviando un virus, sobrecargando, enviando spam o bombardeando el correo.
              Utilizar nuestros Servicios para distribuir malware.
              Usar nuestros Servicios o cualquier funcionalidad de la plataforma Simple Life para cualquier otra finalidad que no sea completar cursos en línea o con fines pedagógicos.
              Suplantar o tergiversar su afiliación con cualquier persona o entidad.
              Aliente o ayude a cualquier persona a hacer cualquiera de las cosas de esta lista.
              
              
              3. Sin nuestro consentimiento previo por escrito, tampoco se le permite:
              
              Visitar o utilizar nuestros Servicios para cualquier forma de extracción de contenido, datos o texto (incluido, entre otros, extracción de pantalla, recolección web o extracción de datos web) a través de medios manuales, mecánicos o automatizados, incluido el uso de bots u otros software similar.
              Usar cualquier contenido, dato o texto en cualquier forma en los Servicios con fines de extracción de texto o datos, o desarrollar o entrenar cualquier aplicación, software, código o modelo de datos, incluidos, entre otros, inteligencia artificial generativa u otra inteligencia artificial y máquina. modelos de aprendizaje independientemente de los fines, ya sean comerciales o no comerciales.
              
              
              
              
              
              
              
              
              
              
              
              POLÍTICA DE DERECHOS DE
              AUTOR Y MARCAS COMERCIALES
              
              
              
              Simple Life respeta los derechos de propiedad intelectual de nuestros proveedores de contenido, instructores, usuarios y otros terceros y espera que nuestros usuarios hagan lo mismo al utilizar los Servicios. Nos reservamos el derecho de suspender, deshabilitar o cancelar las cuentas de los usuarios que infrinjan repetidamente o sean acusados repetidamente de infringir los derechos de autor, marcas comerciales u otros derechos de propiedad intelectual de otros.
              
              La Ley de Derechos de Autor del Milenio Digital de 1998 (la &quot;DMCA&quot;) proporciona recursos para los propietarios de derechos de autor que creen que el material que aparece en Internet infringe sus derechos según la ley de derechos de autor de EE. UU. Si desea leer la DMCA, visite el sitio web de la Oficina de derechos de autor de EE. UU. en http://www.copyright.gov/legislation/dmca.pdf.
              
              Si cree de buena fe que los materiales de la plataforma Simple Life infringen sus derechos de autor, la DMCA establece que usted (o su agente) puede enviarnos un aviso solicitando que se elimine el material o se bloquee el acceso a él.
              
              El aviso debe incluir la siguiente información:
              
              la firma física o electrónica de una persona autorizada para actuar en nombre del titular de un derecho exclusivo supuestamente infringido;
              identificación de la obra protegida por derechos de autor que se alega ha sido infringida (o, si varias obras protegidas por derechos de autor ubicadas en la plataforma están cubiertas por una única notificación, una lista representativa de dichas obras);
              identificación del material que se afirma que infringe o es objeto de actividad infractora, e información razonablemente suficiente para permitir que Simple Life ubique el material en la plataforma;
              el nombre, dirección, número de teléfono y dirección de correo electrónico (si está disponible) de la parte reclamante;
              una declaración de que la parte reclamante cree de buena fe que el uso del material en la forma reclamada no está autorizado por el propietario de los derechos de autor, su agente o la ley; y
              una declaración de que la información contenida en la notificación es exacta y, bajo pena de perjurio, que la parte reclamante está autorizada a actuar en nombre del propietario de un derecho exclusivo que supuestamente se ha infringido.
              Los avisos deben cumplir con los requisitos legales vigentes en ese momento impuestos por la DMCA. Las notificaciones y contranotificaciones con respecto a los Servicios pueden enviarse:
              por correo: Agente de derechos de autor, Simple Life Marcelo T de Alvear 628, Piso 13, Córdoba – Argentina, Correo Postal X5000.
              por correo electrónico: soy@SimpleLifeOfficial.com
              
              Le sugerimos que consulte a su asesor legal antes de presentar un aviso. Además, tenga en cuenta que puede haber sanciones por reclamaciones falsas según la DMCA.
              
              Simple Life también respeta los derechos de marca de otros. Simple Life puede actualizar, suspender, deshabilitar o cancelar cuentas con cualquier otro contenido que engañe a otros o viole la marca registrada de otra persona a su exclusivo criterio. Si le preocupa que alguien pueda estar usando su marca registrada sin el permiso adecuado en nuestros Servicios, envíenos un correo electrónico a soy@SimpleLifeOfficial.com y revisaremos su envío. Si lo consideramos apropiado, podemos eliminar el contenido ofensivo, advertir a la persona que publicó el contenido y/o suspender o inhabilitar temporal o permanentemente la cuenta de la persona.
              
              
              
              
              
              
              
              
              
              
              
              
              POLÍTICA DE PAGOS Y REEMBOLSOS
              
              
              Para obtener detalles sobre nuestras políticas de reembolso y cancelación, consulte la información a continuación. Tenga en cuenta que nuestras políticas pueden diferir entre ofertas y las opciones de pago pueden variar. Tenga en cuenta también que tratamos muy en serio las violaciones de nuestros Términos de uso y Código de honor, y no tenemos la obligación de ofrecer reembolsos a los usuarios que violen estas u otras políticas de Simple Life, incluso si sus solicitudes se realizan dentro del período de reembolso designado. De manera similar, no tenemos ninguna obligación de ofrecer reembolsos tardíos a los usuarios que no obtengan una calificación aprobatoria en una Oferta de Contenido o que no estén satisfechos con su calificación final. Para obtener más información sobre nuestro proceso de reembolso, incluidas instrucciones para solicitar un reembolso, visite nuestro Centro de ayuda para estudiantes.
              
              
              1. COMPRAS ÚNICAS
              
              Si cancela su inscripción paga única para un curso o especialización, Simple Life le ofrecerá un reembolso completo hasta 7 días después del pago. Si se preinscribe y paga un curso o especialización, Simple Life le ofrecerá un reembolso completo hasta 7 días después del lanzamiento del curso o especialización o hasta que haya obtenido su certificado de curso o especialización, lo que ocurra primero.
              
              
              Reembolsos por certificados
              
              Proyectos guiados: Si no obtiene su certificado de finalización dentro de los 180 días posteriores a la inscripción en un proyecto guiado, su registro caducará y deberá pagar para volver a inscribirse en el proyecto guiado a fin de completar el proyecto guiado y obtener su certificado de finalización.
              
              Cursos: Una vez que haya obtenido un certificado del curso con su pago, no será elegible para un reembolso incluso si es dentro de los 7 días. Si no obtiene el certificado del curso dentro de los 180 días, su registro caducará y deberá pagar para volver a inscribirse en el curso.
              
              Especializaciones: A menos que se indique lo contrario como parte del proceso de registro, tienes un año después de comprar una especialización para completarla.
              
              
              2. SUSCRIPCIONES DE ESPECIALIZACIÓN MES A MES
              
              Reembolsos generales: Simple Life no ofrece reembolsos por pagos realizados en un plan de suscripción de especialización mensual.
              
              Reembolsos por pruebas: Para evitar que se le cobre durante un período de prueba gratuito, debe cancelar su suscripción antes de que finalice la prueba gratuita. Si completa un curso durante el período de prueba gratuito, Simple Life se reserva el derecho de exigirle que pague una suscripción de un mes para poder recibir un curso y/o certificado de especialización.
              
              Cancelación: Su suscripción continuará mes a mes a menos y hasta que la cancele o Simple Life suspenda o interrumpa la suscripción. Si cancela su suscripción, la cancelación se hará efectiva al final del período mensual actual. Continuará teniendo acceso a su suscripción durante el resto de ese período, pero no recibirá un reembolso. Para suscripciones a especializaciones individuales, Simple Life suspenderá automáticamente su suscripción al final del período mensual durante el cual obtiene un certificado para la especialización.
              
              
              3. SIMPLE LIFE
              
              Reembolsos generales: Para obtener un reembolso completo del pago de su suscripción a Simple Life Plus, envíe una solicitud de reembolso a través del Centro de ayuda para estudiantes dentro de los 14 días posteriores a su pago. No se proporcionarán reembolsos si se solicitan después de este período de 14 días.
              
              Reembolsos por pruebas: Algunas suscripciones de Simple Life Plus pueden tener un período de prueba gratuito en lugar de un período de reembolso. Si no cancela durante la prueba gratuita, se le facturará el monto total de la suscripción a la que se registró y no podrá solicitar un reembolso.
              
              Reembolsos por actualizaciones: Si actualiza de Simple Life Lite a Simple Life Plus, tiene 14 días a partir de la fecha de la actualización para que no se le cobre en la siguiente fecha de facturación o para recibir un reembolso.
              
              Cancelación: Su suscripción a Simple Life Plus continuará durante el período de suscripción identificado en el momento de su compra y luego se renovará automáticamente a menos y hasta que cancele su suscripción o Simple Life suspenda o descontinúe la suscripción. Si cancela su suscripción después del período de reembolso de su suscripción, seguirá teniendo acceso hasta el final del período de suscripción y no se le facturará para el siguiente ciclo de facturación.
              
              
              4. PROGRAMAS DE CERTIFICADO UNIVERSITARIO
              
              Las políticas de reembolso para los programas de Licenciatura, MasterTrack y Certificado Universitario las establece y administra el Proveedor de contenido que ofrece el programa. Esos proveedores de contenido comunican las políticas de reembolso a los estudiantes.
              
              
              5. OTROS SERVICIOS PAGOS
              
              Salvo lo descrito en esta Política de reembolso o lo establecido explícitamente como parte del proceso de registro de un Servicio, Simple Life no tiene obligación de proporcionar reembolsos o vales para ningún otro Servicio.
              
              Simple Life se reserva el derecho de ofrecer reembolsos a su discreción. Tenga en cuenta que nuestras políticas difieren entre los pagos de suscripción y los pagos únicos realizados para compras de cursos, especializaciones y proyectos guiados, y que las opciones de pago pueden variar de una oferta a otra. Tenga en cuenta también que tratamos muy en serio las violaciones de nuestros Términos de uso y Código de honor, y no tenemos la obligación de ofrecer reembolsos a los usuarios que violen estas u otras políticas de Simple Life, incluso si sus solicitudes se realizan dentro del período de reembolso designado. De manera similar, no tenemos ninguna obligación de ofrecer reembolsos tardíos a los usuarios que no obtengan una calificación aprobatoria en una Oferta de Contenido o que no estén satisfechos con su calificación final.
              
              Para obtener más información sobre nuestro proceso de reembolso, incluidas instrucciones para solicitar un reembolso, visite nuestro Centro de ayuda para estudiantes.
              
              
              6. MERCADOS DE TERCEROS
              
              Sin perjuicio de lo anterior, si compra o se suscribe a un curso, especialización, proyecto guiado o compra cualquier otro Servicio pago, a través de un mercado de terceros (por ejemplo, compras dentro de la aplicación a través de Apple App Store o compras realizadas a través de ciertos servicios de pago alternativos ), se aplicará la política de reembolso aplicable a ese mercado de terceros, a menos que Simple Life indique explícitamente lo contrario. Salvo que Simple Life indique explícitamente lo contrario, el mercado de terceros será el único responsable de realizar reembolsos según su política de reembolso, y Simple Life no tendrá obligaciones de reembolso. Simple Life renuncia a cualquier responsabilidad u obligación relacionada con la política de reembolso de cualquier mercado de terceros o el cumplimiento o incumplimiento por parte del tercero de dicha política.
              
              
              7. OFERTAS PROMOCIONALES
              
              Es posible que de vez en cuando ofrezcamos ofertas promocionales especiales o descuentos (&quot;Ofertas&quot;). Simple Life determina la elegibilidad de la oferta a su exclusivo criterio y nos reservamos el derecho de revocar una Oferta en caso de que determinemos que usted no es elegible. Es posible que los usuarios con una Oferta existente no sean elegibles para Ofertas adicionales. Podemos utilizar información como el método de pago o la dirección de correo electrónico de una cuenta utilizada con una compra de Simple Life para determinar la elegibilidad de la Oferta. Los requisitos de elegibilidad y otras limitaciones y condiciones se divulgarán cuando se registre en la Oferta o en otras comunicaciones que se pongan a su disposición.
              
              
              8. CAMBIOS EN EL PRECIO Y LOS PLANES DE SUSCRIPCIÓN
              
              Nos reservamos el derecho de cambiar nuestros planes de suscripción o ajustar el precio de nuestro servicio o cualquiera de sus componentes de cualquier manera y en cualquier momento, según lo determinemos a nuestro exclusivo y absoluto criterio. Salvo que se indique expresamente lo contrario en estos Términos, cualquier cambio de precio o cambio en su plan de suscripción entrará en vigor después de que se le notifique.
              
              
              
              CODIGO DE HONOR
              
              
              Se espera que todos los usuarios de materiales de aprendizaje alojados en la plataforma Simple Life cumplan con los siguientes estándares para garantizar la integridad del aprendizaje dentro de las experiencias de aprendizaje de Simple Life. Se espera que los estudiantes se familiaricen y cumplan con la plataforma Simple Life y cualquier código de conducta, política académica, código de honor o requisitos de cualquier institución asociados con los programas en los que un estudiante se haya inscrito a través de la plataforma Simple Life.
              
              La mala conducta académica socava el valor de las credenciales alojadas en Simple Life y devalúa los esfuerzos auténticos de otros estudiantes. Por lo tanto, los estudiantes que participan en mala conducta están sujetos a las consecuencias que se describen a continuación.
              
              La mala conducta académica se define como cualquier actividad que eluda, o intente eludir, la experiencia de aprendizaje proporcionada por el curso mediante la violación de las políticas de aprendizaje del curso o políticas específicas proporcionadas por el instructor o descritas en el programa de estudios, o la tergiversación de la autoría o las condiciones de finalización. por supuesto actividades. Los siguientes estándares brindan aclaraciones sobre los tipos más comunes de mala conducta académica, pero la lista no es exhaustiva. Otro comportamiento puede constituir mala conducta académica en un curso en particular o en toda la plataforma Simple Life.
              
              
              DEFINICIONES
              
              Trabaje dentro de una actividad de Simple Life: toda la actividad en la plataforma Simple Life, incluidos los inicios de sesión y todas las actividades del curso, está sujeta a estas políticas. El trabajo incluye, entre otros, exámenes, cuestionarios, actividades de revisión por pares, evaluaciones, contribuciones a foros de discusión, proyectos guiados y laboratorios. Además, estas políticas también cubren las actividades fuera de la plataforma que pertenecen a los cursos en la plataforma.
              
              No autorizado: las actividades que violan los Términos de uso, las políticas del curso o de la plataforma de Simple Life, las actividades que son ilegales o aquellas actividades que violan los estándares académicos o los estándares de integridad que un estudiante en la plataforma de Simple Life debe conocer se consideran no autorizadas.
              
              
              VIOLACIONES
              
              Plagio: El plagio es cuando se copia o reproduce palabras, ideas o cualquier otro material de otra fuente sin dar crédito al autor original. El plagio también incluye la práctica de emplear o permitir que otra persona altere o revise su trabajo y luego presentar el trabajo como propio. Los alumnos pueden discutir las evaluaciones entre ellos o con un instructor o tutor, pero todas las presentaciones de evaluaciones deben ser trabajos originales realizados de forma independiente por el alumno. Esto incluye trabajos parafraseados, traducidos o modificados de otro modo utilizando medios automatizados. El plagio también puede incluir el autoplagio, cuando un alumno envía el mismo trabajo que ya había enviado para otra evaluación o módulo, cuando esto no se divulga ni se permite.
              Uso de materiales no autorizados: usar o consultar materiales no autorizados (incluidos materiales electrónicos y herramientas de IA generativa que incluyen, entre otros, ChatGPT o software o aplicaciones similares) o usar equipos o dispositivos no autorizados en cualquier trabajo dentro de una actividad de Simple Life, a menos que expresamente permitido.
              Colaboración no autorizada: trabajar junto con cualquier persona en cualquier trabajo dentro de una actividad de Simple Life a menos que esté expresamente permitido.
              Hacer trampa en el contrato: pagar, intercambiar o conseguir de otro modo que otra persona cree un trabajo para enviarlo a un curso de Simple Life o para trabajar dentro de una actividad de Simple Life.
              Suplantación: completar el trabajo dentro de cualquier actividad de Simple Life (incluidos, entre otros, exámenes, evaluaciones y actividades de aprendizaje) cuando inicia sesión como otro usuario o hacer que otro usuario complete el trabajo dentro de una actividad de Simple Life cuando inicia sesión como usted; tergiversar de otro modo la autoría del trabajo presentado en Simple Life.
              Compartir recursos no autorizados: poner a disposición de cualquier otra persona cualquier información o soluciones sobre tareas, pruebas, exámenes, proyectos y otras evaluaciones (excepto en la medida en que una evaluación permita explícitamente compartir soluciones). Esto incluye soluciones escritas por usted, otros estudiantes, recursos externos o cualquier solución proporcionada por el personal del curso u otros.
              Fraude: cualquier tergiversación sobre la autoría o las condiciones bajo las cuales se realizó el trabajo dentro de una actividad de Simple Life no especificada de otra manera o falsificar cualquier evidencia que respalde cualquier reclamo de circunstancias atenuantes.
              Otro: cualquier otro comportamiento que le confiera una ventaja injusta a usted o a otra persona o cualquier actividad que intente mejorar de manera deshonesta sus resultados o mejorar o dañar los resultados de otros en el desempeño del trabajo dentro de una actividad de Simple Life.
              
              
              CONSECUENCIAS PARA LOS PRODUCTOS NO CERTIFICADOS
              
              Simple Life determinará las sanciones pertinentes en función del tipo de mala conducta, la gravedad del comportamiento, lo que está en juego en la evaluación y cualquier historial previo de mala conducta por parte del usuario.
              
              No se emitirán reembolsos en caso de que se tomen medidas correctivas por dichas violaciones. Las violaciones del Código de Honor se determinarán a exclusivo criterio de Simple Life y los socios de Simple Life. Se le notificará si se ha determinado que ha violado este Código de Honor y se le informará de la acción correspondiente a tomar como resultado de la violación.
              
              
              CONSECUENCIAS PARA LOS CURSOS CERTIFICADOS
              
              Para los programas con Certificado Universitario, las consecuencias quedan a discreción exclusiva del proveedor de contenido.
           
          </p>

          <button 
            onClick={handleReadMoreClick} 
            className="text-blue-500 hover:text-blue-800 mt-4"
          >
            {isExpanded ? 'Leer menos' : 'Leer más'}
          </button>
  
  {/* Add a close button if you want to allow users to hide the floating div */}
  <button className="absolute top-2 right-2 mb-4 pl-4 text-slate-500 hover:text-slate-800"
  onClick={handleReadMoreClick}
  >
    {isExpanded ? <XIcon /> : <BookOpenIcon />  }

  </button>

{/* { isUserRegistered && ( */}
  <>
  <Checkbox id="terms" className="justify-evenly m-6" />
          <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col"
      >
       Aceptar publicidad
      </label>
      <p className="text-sm text-muted-foreground">
      Aceptas nuestros Términos de servicio y Política de privacidad. Aceptas la publicidad
        </p>
  <AlertDialog>
            <AlertDialogTrigger className="p-4 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 m-6 ">Aceptar Términos y Políticas</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                Esta acción no se puede deshacer. Esto le permitirá acceder a todo el potencial de nuestra plataforma.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <Link href='/'>
                <AlertDialogAction>Continuar</AlertDialogAction>
                </Link>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>   
          </>
 {/* )}  */}
</div>


      </div>
    </div>
  );
};

export default NewUser;
